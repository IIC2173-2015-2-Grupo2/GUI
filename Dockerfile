FROM node:4.2.2-onbuild
RUN npm install -g gulp
RUN gulp build
RUN npm uninstall -g gulp
EXPOSE 3000
