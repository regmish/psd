var express    =       require("express");
var multer     =       require('multer');
var app        =       express();
var exporter   =       require("./export_layer");
var tree       =       require("./tree");
var done       =       false;

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename
  },
onFileUploadStart: function (file) {
  console.log('upload ' + file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
  exporter(file.path);
  tree(file.path);
}
}));

app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.post('/upload',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("Upload Successful");
  }
});

app.listen(8080,function(data){
    console.log("serving on port 8080");
});
