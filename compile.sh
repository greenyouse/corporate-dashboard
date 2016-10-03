#!/bin/bash

polymer build --html.collapseWhitespace;

cat sw-additions.js >> build/bundled/service-worker.js;
cat sw-additions.js >> build/unbundled/service-worker.js;
