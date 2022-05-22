/* eslint-disable */
self.addEventListener('message', function (event) {
  var time = event.data.start
  var playing = event.data.playing
  setInterval(() => {
    if (playing) {
      time -= 100
      self.postMessage({ time: time })
    } else {
      self.postMessage({ time: time })
    }
  }, 100)
})
