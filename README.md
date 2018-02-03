# Fatihapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.


# Dockerized Angular 4 App (with Angular CLI)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Build docker image

```
$ docker build -t myapp . 
```

## Run the container

```
$ docker run -d -p 4200:80 myapp
```


The app will be available at http://localhost:4200

You can easily tweak the nginx config in ```nginx/default.conf```
