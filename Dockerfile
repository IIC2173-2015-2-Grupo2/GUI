# This image will be based on the official nodejs docker image
FROM node:latest
 
# Set in what directory commands will run
WORKDIR /home/app
 
# Put all our code inside that directory that lives in the container
ADD . /home/app
 
# Install dependencies
RUN \
    npm install --global gulp && \
    npm install && \
    npm run build
 
# Tell Docker we are going to use this port
EXPOSE 8000
