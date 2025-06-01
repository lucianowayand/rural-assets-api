# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Install git (required for build script)
RUN apk add --no-cache git

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env .

# Build the NestJS app
RUN npm run build

# Expose the port (default NestJS port)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
