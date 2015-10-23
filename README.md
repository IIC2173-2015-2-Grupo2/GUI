# Newsify GUI

[![Build Status](https://travis-ci.org/IIC2173-2015-2-Grupo2/GUI.svg)](https://travis-ci.org/IIC2173-2015-2-Grupo2/GUI) [![Code Climate](https://codeclimate.com/github/IIC2173-2015-2-Grupo2/GUI/badges/gpa.svg)](https://codeclimate.com/github/IIC2173-2015-2-Grupo2/GUI)

### Framework: AngularJS ([Styleguide](https://github.com/johnpapa/angular-styleguide))

### Development Setup

Make sure you have NodeJS 4.x.x and npm 3.3.4 installed.

Then, check if you have gulp installed. If you do not have it, run the following
command:

```sh
$ npm install --global gulp
```

And install all of the dependencies via

```sh
$ npm install
```

In order to compile `scss` into `css`, to start the *watch* tasks of gulp, and start the local server just visit the application directory and:

```sh
$ npm start
```

You should now be able to open your browser and visit `http://localhost:8080` to
begin using the application.

#### Notes:

* Since this application uses CDN for some of its scripts and stylesheets
  (particularly AngularJS and Bootstrap), you must run the development
  environment while connected to the internet.
