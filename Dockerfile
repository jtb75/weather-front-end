# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using a lightweight web server
FROM nginx:alpine
# Copy the built application from the build stage to the nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
