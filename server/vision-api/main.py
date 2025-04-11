from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
#import jwt
#from jwt import PyJWTError
import os
from dotenv import load_dotenv  # Import dotenv to load .env file
from fastapi import UploadFile, File
from torchvision import models, transforms
from PIL import Image
import torch
import requests
import json

# Load environment variables from .env file
load_dotenv()

# Read configuration from .env
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")  # Default to HS256 if not set
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))  # Default to 30 minutes if not set

# FastAPI app initialization
app = FastAPI()

# JWT Bearer security dependency
security = HTTPBearer()

# Constants
IMAGENET_URL = "https://github.com/raghakot/keras-vis/blob/master/resources/imagenet_class_index.json"
IMAGENET_FILENAME = "imagenet_class_index.json"
OF_API_URL = "https://world.openfoodfacts.org/cgi/search.pl"


# Function to load the ImageNet class index
def load_imagenet_class_index():
    if not os.path.exists(IMAGENET_FILENAME):
        print(f"{IMAGENET_FILENAME} not found, downloading...")
        response = requests.get(IMAGENET_URL)
        with open(IMAGENET_FILENAME, 'w') as f:
            f.write(response.text)
        print(f"Downloaded {IMAGENET_FILENAME}")
    
    with open(IMAGENET_FILENAME) as f:
        return json.load(f)


# Function to initialize the pre-trained model
def initialize_model():
    model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
    model.eval()
    return model


# Function to process and transform the image for the model
def preprocess_image(img: Image.Image, transform: transforms.Compose):
    return transform(img).unsqueeze(0)


# Function to verify JWT token
# def verify_token(authorization: HTTPAuthorizationCredentials = Depends(security)):
#     try:
#         # Decode the JWT token
#         payload = jwt.decode(authorization.credentials, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload  # The decoded payload can be used for further validation if needed
#     except PyJWTError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )


# Function to query Open Food Facts API for nutrition data
def query_open_food_facts(product_name: str):
    params = {
        'search_terms': product_name,
        'search_simple': '1',
        'json': '1'
    }
    
    response = requests.get(OF_API_URL, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to query Open Food Facts")
    
    data = response.json()
    
    # Check if we got any results
    if 'products' in data and len(data['products']) > 0:
        product = data['products'][0]  # Take the first product from the results
        nutrition_data = {
            'product_name': product.get('product_name', 'Unknown'),
            'calories': product.get('nutriments', {}).get('energy-kcal_100g', 'Not Available'),
            'fat': product.get('nutriments', {}).get('fat_100g', 'Not Available'),
            'carbohydrates': product.get('nutriments', {}).get('carbohydrates_100g', 'Not Available'),
            'protein': product.get('nutriments', {}).get('proteins_100g', 'Not Available')
        }
        return nutrition_data
    else:
        raise HTTPException(status_code=404, detail="Product not found in Open Food Facts")


# FastAPI route to classify the image and query Open Food Facts for nutrition information
@app.post("/classify/")
async def classify_image(file: UploadFile = File(...), authorization: HTTPAuthorizationCredentials = Depends(security)):
    # Verify JWT token
    #verify_token(authorization)

    try:
        # Load ImageNet class index and model
        class_idx = load_imagenet_class_index()
        model = initialize_model()

        # Pre-process the image
        img = Image.open(file.file).convert("RGB")
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
        ])
        input_tensor = preprocess_image(img, transform)

        # Get the model's output
        output = model(input_tensor)

        # Get the index of the predicted class
        _, predicted_idx = torch.max(output, 1)

        # Get the label for the predicted index
        predicted_label = class_idx[str(predicted_idx.item())][1]

        # Query Open Food Facts for nutrition information
        nutrition_info = query_open_food_facts(predicted_label)

        # Return the prediction and nutrition info in a JSON response
        return {
            "predicted_class_index": predicted_idx.item(),
            "predicted_class_label": predicted_label,
            "nutrition_info": nutrition_info
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "Healthy", "message": "FastAPI is running successfully!"}