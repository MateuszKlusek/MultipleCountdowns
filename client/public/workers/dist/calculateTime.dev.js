"use strict";

/* eslint-disable */
var seconds;
self.addEventListener("message", function (event) {
  seconds = event.data.start;
});
setInterval(function () {
  console.log(new Date().getTime())
  seconds -= 1;
  self.postMessage({
    s: seconds
  });
}, 1000);