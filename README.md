# Corporate Dashboard

An admin dashboard for the Udacity Senior Web Developer program.

## Features

This a basic
[Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app)
for showing various analytics like office data and customer info.

Here are some of the features it has:
- updates example data in real-time
- uses the app shell layout with HTTP2
- caches page info with a service workers
- can be installed to the homescreen on mobile
- built with responsive design

## Try It Out

To run the app locally, first make sure you have polymer-cli:

```sh
npm install -g polymer-cli
```

Then clone and build the app:

```sh
git clone https://github.com/greenyouse/corporate-dashboard
cd corporate-dashboard
bower install
npm install
./compile.sh
```

Serve up the app and view it at [localhost:8080](http://localhost:8080):

```sh
npm run serve
polymer serve build/unbundled
```

Load data by flipping the toggle under the app header (it uses push
notifications which require user authentication). After a few seconds
messages should start streaming in and populate the displays.
