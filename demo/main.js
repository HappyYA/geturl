const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = require('./router.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/',router);
let server = app.listen(3000,function () {
  console.log('服务监听在3000端口');
});