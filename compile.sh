#!/bin/bash

polymer build --html.collapseWhitespace;

# cat sw-additions.js >> build/bundled/service-worker.js;
# cat sw-additions.js >> build/unbundled/service-worker.js;

rm build/bundled/service-worker.js
rm build/unbundled/service-worker.js

cp sw.js build/bundled/service-worker.js
cp sw.js build/unbundled/service-worker.js
