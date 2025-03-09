# Use the Node.js 20 base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY api/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY api/ ./

# Run the build script (if defined in package.json)
RUN npm run build

# Rebuild native modules
# RUN pnpm rebuild

# Expose the port your Fastify app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]