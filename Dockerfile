FROM node:4.2.1-onbuild
RUN npm install -g gulp
RUN gulp build
RUN npm uninstall -g gulp
EXPOSE 3000
