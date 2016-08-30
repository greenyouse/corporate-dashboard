# Corporate Dashboard

An admin dashboard for the Udacity Senior Web Developer program.

## Features

This a basic
[Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app)
for showing various analytics like office data and customer info.

Here are some of the features it has:
- updates example data in real-time
- uses the app shell layout
- caches page info with a service workers
- can be installed to the homescreen on mobile
- built with responsive design

## Try It Out

To run the app locally, first make sure you have polymer-cli:

```sh
npm install -g polymer-cli
```

Then clone and build the app:

```
git clone https://github.com/greenyouse/corporate-dashboard
cd corporate-dashboard
polymer build
```

Finally, serve up the app and view it at [localhost:8080](http://localhost:8080):

```sh
cd build/bundled
polymer serve
```
