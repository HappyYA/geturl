const express = require("express");
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

router.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Content-Length, Authorization, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Max-Age", '1728000');
  next();
});
router.post('/',function (req,res) {
  console.log(req.body.url);
  let url = req.body.url;
  request(url,function (error,response,body) {
    if(!error && response.statusCode === 200){
      $ = cheerio.load(body);
      let url_arr = $('.album-numlist a');
      let url_obj=[];
      let film_title = $('.info-intro-title').text();
      let result = {};
      url_arr.each(function (index,item) {
        let title = '第'+$(this).attr('title')+'集';
        url_obj.push(title+'$'+$(this).attr('href')+'$qiyi');
      });
      result={
        filmTitle:film_title,
        urlList:url_obj
      };
      res.json(result);
    }
  })
});
module.exports=router;