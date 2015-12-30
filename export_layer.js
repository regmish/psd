var PSD = require('psd');
var mkdirp = require('mkdirp');

module.exports = function exporter(file) {
  var start = new Date();

  PSD.open(file).then(function(psd) {
    psd.tree().descendants().forEach(function(node) {
      if (node.isGroup()) return true;
      var nodename = node.name;
      var dir = node.path();
      if (nodename.length < dir.length)
        dir = dir.slice(0, dir.length - nodename.length - 1);
      dir = "./output/" + dir;
      mkdirp.sync(dir, function(err) {
        console.log(err.stack);
        // path was created unless there was error

      });

      console.log(dir + "/" + node.name + ".png");
      console.log(node.name + ".png \n");
      node.saveAsPng(dir + "/" + node.name + ".png").catch(function(err) {
        console.log(err.stack);
      });
    });
  }).then(function() {
    console.log("Finished in " + ((new Date()) - start) + "ms");
  });
}