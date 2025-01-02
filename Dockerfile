# Use an NGINX base image
FROM nginx:alpine

# Set the working directory to the NGINX web root
WORKDIR /usr/share/nginx/html

# Remove the default NGINX static assets
RUN rm -rf ./*

# Copy the static assets into the web root
COPY ./public ./public
COPY ./src/index.html ./index.html
COPY ./src/script.js ./script.js

# Expose the default HTTP port
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]

