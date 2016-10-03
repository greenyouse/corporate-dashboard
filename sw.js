// cache busting is done by upgrading the cache version
var staticCache = 'corporate-dashboard-v1',
    CURRENT_CACHES = [
      staticCache,
    ];

var staticPrecache = [
  '/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html',
  '/bower_components/app-layout/app-drawer/app-drawer.html',
  '/bower_components/app-layout/app-header-layout/app-header-layout.html',
  '/bower_components/app-layout/app-header/app-header.html',
  '/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html',
  '/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html',
  '/bower_components/app-layout/app-scroll-effects/effects/blend-background.html',
  '/bower_components/app-layout/app-scroll-effects/effects/fade-background.html',
  '/bower_components/app-layout/app-scroll-effects/effects/material.html',
  '/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html',
  '/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html',
  '/bower_components/app-layout/app-scroll-effects/effects/resize-title.html',
  '/bower_components/app-layout/app-scroll-effects/effects/waterfall.html',
  '/bower_components/app-layout/app-toolbar/app-toolbar.html',
  '/bower_components/app-layout/helpers/helpers.html',
  '/bower_components/app-route/app-location.html',
  '/bower_components/app-route/app-route-converter-behavior.html',
  '/bower_components/app-route/app-route.html',
  '/bower_components/font-roboto/roboto.html',
  '/bower_components/google-apis/google-maps-api.html',
  '/bower_components/google-chart/charts-loader.html',
  '/bower_components/google-chart/google-chart-loader.html',
  '/bower_components/google-chart/google-chart.css',
  '/bower_components/google-chart/google-chart.html',
  '/bower_components/iron-a11y-announcer/iron-a11y-announcer.html',
  '/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html',
  '/bower_components/iron-a11y-keys/iron-a11y-keys.html',
  '/bower_components/iron-ajax/iron-request.html',
  '/bower_components/iron-behaviors/iron-button-state.html',
  '/bower_components/iron-behaviors/iron-control-state.html',
  '/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html',
  '/bower_components/iron-dropdown/iron-dropdown-scroll-manager.html',
  '/bower_components/iron-dropdown/iron-dropdown.html',
  '/bower_components/iron-fit-behavior/iron-fit-behavior.html',
  '/bower_components/iron-flex-layout/iron-flex-layout-classes.html',
  '/bower_components/iron-flex-layout/iron-flex-layout.html',
  '/bower_components/iron-form-element-behavior/iron-form-element-behavior.html',
  '/bower_components/iron-icon/iron-icon.html',
  '/bower_components/iron-icons/social-icons.html',
  '/bower_components/iron-iconset-svg/iron-iconset-svg.html',
  '/bower_components/iron-input/iron-input.html',
  '/bower_components/iron-jsonp-library/iron-jsonp-library.html',
  '/bower_components/iron-location/iron-location.html',
  '/bower_components/iron-location/iron-query-params.html',
  '/bower_components/iron-media-query/iron-media-query.html',
  '/bower_components/iron-menu-behavior/iron-menu-behavior.html',
  '/bower_components/iron-meta/iron-meta.html',
  '/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html',
  '/bower_components/iron-overlay-behavior/iron-overlay-behavior.html',
  '/bower_components/iron-overlay-behavior/iron-overlay-manager.html',
  '/bower_components/iron-pages/iron-pages.html',
  '/bower_components/iron-resizable-behavior/iron-resizable-behavior.html',
  '/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html',
  '/bower_components/iron-selector/iron-multi-selectable.html',
  '/bower_components/iron-selector/iron-selectable.html',
  '/bower_components/iron-selector/iron-selection.html',
  '/bower_components/iron-selector/iron-selector.html',
  '/bower_components/iron-validatable-behavior/iron-validatable-behavior.html',
  '/bower_components/neon-animation/animations/fade-in-animation.html',
  '/bower_components/neon-animation/animations/fade-out-animation.html',
  '/bower_components/neon-animation/animations/opaque-animation.html',
  '/bower_components/neon-animation/neon-animatable-behavior.html',
  '/bower_components/neon-animation/neon-animation-behavior.html',
  '/bower_components/neon-animation/neon-animation-runner-behavior.html',
  '/bower_components/neon-animation/web-animations.html',
  '/bower_components/paper-behaviors/paper-button-behavior.html',
  '/bower_components/paper-behaviors/paper-checked-element-behavior.html',
  '/bower_components/paper-behaviors/paper-inky-focus-behavior.html',
  '/bower_components/paper-behaviors/paper-ripple-behavior.html',
  '/bower_components/paper-button/paper-button.html',
  '/bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html',
  '/bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html',
  '/bower_components/paper-dropdown-menu/paper-dropdown-menu.html',
  '/bower_components/paper-icon-button/paper-icon-button.html',
  '/bower_components/paper-input/paper-input-addon-behavior.html',
  '/bower_components/paper-input/paper-input-behavior.html',
  '/bower_components/paper-input/paper-input-char-counter.html',
  '/bower_components/paper-input/paper-input-container.html',
  '/bower_components/paper-input/paper-input-error.html',
  '/bower_components/paper-input/paper-input.html',
  '/bower_components/paper-item/paper-item-behavior.html',
  '/bower_components/paper-item/paper-item-shared-styles.html',
  '/bower_components/paper-item/paper-item.html',
  '/bower_components/paper-listbox/paper-listbox.html',
  '/bower_components/paper-material/paper-material-shared-styles.html',
  '/bower_components/paper-menu-button/paper-menu-button-animations.html',
  '/bower_components/paper-menu-button/paper-menu-button.html',
  '/bower_components/paper-ripple/paper-ripple.html',
  '/bower_components/paper-spinner/paper-spinner-behavior.html',
  '/bower_components/paper-spinner/paper-spinner-styles.html',
  '/bower_components/paper-spinner/paper-spinner.html',
  '/bower_components/paper-styles/color.html',
  '/bower_components/paper-styles/default-theme.html',
  '/bower_components/paper-styles/shadow.html',
  '/bower_components/paper-styles/typography.html',
  '/bower_components/paper-toggle-button/paper-toggle-button.html',
  '/bower_components/polymer/polymer-micro.html',
  '/bower_components/polymer/polymer-mini.html',
  '/bower_components/polymer/polymer.html',
  '/bower_components/promise-polyfill/Promise.js',
  '/bower_components/promise-polyfill/promise-polyfill-lite.html',
  '/bower_components/web-animations-js/web-animations-next-lite.min.js',
  '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
  '/index.html',
  '/manifest.json',
  '/src/corporate-dashboard.html',
  '/src/data-view.html',
  '/src/key-metrics.html',
  '/src/my-icons.html',
  '/src/office-view.htm',
  '/src/google-map/google-map-marker.html',
  '/src/google-map/google-map.html'
];

self.oninstall = function(event) {
  event.waitUntil(
    caches.open(staticCache).then(function(cache) {
      return cache.addAll(staticPrecache);
    }).then(function() {
      return self.skipWaiting();
    })
  );
};

self.onactivate = function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // apps usually have a prefixed cache name
          if (CURRENT_CACHES.includes(cacheName)) {
            return cacheName;
          } else {
            return caches.delete(cacheName);
          }})
      ).then(function() {
        self.clients.claim();
      }).catch(function(err) {
        console.error(err);
      });
    })
  );
};

// send the data back to the client so it's loaded into graphs
function loadData(topic, data) {
  self.clients.matchAll().then(function(clients) {
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
