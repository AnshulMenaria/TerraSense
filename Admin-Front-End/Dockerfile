# Use official Nginx base image
FROM nginx:alpine

# Remove default HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build into Nginx's public directory
COPY build/ /usr/share/nginx/html

# Copy your custom nginx config directly into the image
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
