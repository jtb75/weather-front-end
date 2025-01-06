# Use an NGINX base image
FROM nginx:alpine

# Metadata labels
LABEL org.opencontainers.image.title="Weather Front-End"
LABEL org.opencontainers.image.description="The front-end interface for the Weather Wizard application."
LABEL org.opencontainers.image.url="https://github.com/jtb75/weather-front-end"
LABEL org.opencontainers.image.documentation="https://github.com/jtb75/weather-front-end/README.md"
LABEL org.opencontainers.image.source="https://github.com/jtb75/weather-front-end"
LABEL org.opencontainers.image.vendor="NG20 Inc.""
LABEL org.opencontainers.image.licenses="MIT"

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
