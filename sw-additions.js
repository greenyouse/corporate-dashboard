self.addEventListener('push', function(event) {
  var title = 'New Data',
      payload = event.data ? event.data.text() : 'no payload',
      data = JSON.parse(payload),
      topic = data.topic,
      msg = data.message;

  // load the data and then show the update messsage
  loadData(topic, msg);

  // event.waitUntil(
  //   self.registration.showNotification(title, {
  //     body: payload,
  //     icon: 'images/app-icon-32.png'
  //   }));
});

// send the data back to the client so it's loaded into graphs
function loadData(topic, data) {
  self.clients.matchAll().then(function (clients) {
    if (clients.length == 0) {
      console.error('No window clients detected');
      return;
    }

    clients.map(function(client) {
      var id = client.id;

      client.postMessage({
        client: id,
        message: data,
        topic: topic
      });

    });
  });
}
