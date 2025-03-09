# Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit project
RUN npm run build

# Use a smaller base image for the final stage
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose the port (default to 3000 if PORT is not set)
ENV PORT=8080
EXPOSE $PORT

# Start the SvelteKit app
CMD ["node", "build", "--port", "$PORT"]