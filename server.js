const chokidar = require('chokidar'),
      express = require('express'),
      fs = require('fs'),
      http = require('http'),
      glob = require('glob').Glob,
      process = require('process'),
      serveStatic = require('serve-static'),
      url = require('url'),
      webPush = require('web-push');


// mild obstrufication for bots scanning GH :)
var serverKey = 'AIzaSyCVvDqihS3BhFEE2IWA0npeUH94keFDcOUx9';
webPush.setGCMAPIKey(serverKey.substr(0, serverKey.length - 2));

// var options = {
//   pfx: fs.readFileSync('aa34f6b8-f1c5-4e32-afd7-7a5f9f0b659c.pfx'),
//   passphrase: 'password'
// };


// just using in-memory storage here (would do encryption + a database for
// real prod)
var subscribers = new Set(),
    datasets = {},
    sendDataInterval = 3000, // send data every 10 seconds
    page = 'reports';

var app = express();
app.set('port', 7000);

// cors middleware for requests
function writeCors(statusCode, response) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type"});

  response.write('true');
  response.end();
}

// cors preflight
app.options('/subscription', function(req, res) {

  writeCors(200, res);
});

app.put('/subscription', function(req, res) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    var subscription = JSON.parse(body);
    console.log('New Subscription: ', subscription.endpoint);

    // save the subscriber
    subscribers.add(subscription);

    writeCors(201, res);
  });
});

// TODO: is there a way to abstract out the copy/pate coding here?
app.delete('/subscription', function(req, res) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    var subscription = JSON.parse(body);
    //console.log('Removing Subscription: ', subscription.endpoint);

    // delete the subscriber
    subscribers.delete(subscription);

    writeCors(200, res);
  });
});

app.post('/page', function(req, res) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    var newPage = body;

    // set the new page
    newPage.match(/key/) ? page = 'customers' :
      newPage.match(/data/) ? page = 'reports' :
      page = 'offices';

    // console.log('page', newPage, page);
    writeCors(200, res);
  });
});

// Sends a notification message to some subscribers
function sendNotifications(message) {
  var subscriptions = Array.from(subscribers);

  console.log('sending notifications');
  if (subscriptions.length == 0) return;

  var payload = JSON.stringify({"message": message });
  // console.log('payload', payload);

  for (var i = 0; i < subscriptions.length; i++) {
    var subscriber = subscriptions[i];
    var {endpoint, key, auth} = subscriber;

    webPush.sendNotification(endpoint, {
      TTL: 300,
      payload: payload,
      userPublicKey: key,
      userAuth: auth
    }).catch(error => {
      console.error('Push Error: ', error);
    });
  }
}

// Sends notifications that contain data updates
function pulseData () {
  var i = 1;
  setInterval(() => {
    var key = page + '-' + i,
        data = datasets[key];

    sendNotifications(data);

    // switch to the next dataset
    i == 2 ? i = 1 : i = 2;
  }, sendDataInterval);
}

// Loads the example data into memory
function fetchDatasets() {
  // load the two datasets
  for (var i = 1; i < 3; i++) {
    var pattern = "data/*-" + i + ".*";
    glob(pattern, (_, matches) => {
      matches.map(file => {
        fs.readFile(file, 'utf-8', (_, text) => {
          // index data by the file name
          var fileName = file.match(/\/(.+-\d)/)[1];
          datasets[fileName] = text;
        });
      });
    });
  }
}

// watch the data files and send an update onChange
chokidar.watch("data/**/*").on('change', path => {
  fs.readFile(path, 'utf-8', (_, data) => {
    console.log("file changed: ", path);
    sendNotifications(data);
  });
});


// server startup code is down here
fetchDatasets();
pulseData();

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Started server on port ' + app.get('port'));
});
