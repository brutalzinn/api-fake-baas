# Use the Node.js 18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY tsconfig.* ./

COPY package.json package.json

RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose port 80
EXPOSE 80

# Define the command to start your Node.js application
CMD [ "npm", "run", "start:prod" ]