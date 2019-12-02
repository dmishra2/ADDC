module.exports = function() {

    this.After(function(scenario, callback) {
      if (scenario.isFailed()) {
        browser.takeScreenshot().then(function(buffer) {
          var decodedImage = new Buffer(buffer, 'base64');
          scenario.attach(decodedImage, 'image/png');
          callback();
        }, function(err) {
          callback(err);
        });
      } else {
        callback();
      }
    });
  };