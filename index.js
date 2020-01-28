var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var fileupload = require('express-fileupload');
var app = express();
var mime = require('mime-types')
var port = process.env.PORT || 3000;
app.use(cors());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('uploads'))
app.post("/upload", function(req, res) {
  console.log(req.files);
  const file = req.files.file;
  const original = file.name;
  const mimetype= file.mimetype;
  console.log(file,original,mimetype);
  file.name  = mime.extension(file.mimetype).toUpperCase()+new Date().valueOf()+'.'+mime.extension(file.mimetype);
  file.mv('./uploads/' + file.name, function(err, result) {
   if(err) 
{
  res.send({
    err,
    success: false,
    message: "File failed!",
   });
}
   res.send({
     ext:mime.extension(file.mimetype),
    success: true,
    message: "File uploaded!",
    file:file.name,
    original:original
   });
  })
 })

app.listen(port, function() {
  console.log("chat services working in http://localhost:" + port);
});
