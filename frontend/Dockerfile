# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the application
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the build directory
CMD ["serve", "-s", "build"]
