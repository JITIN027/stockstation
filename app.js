const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const ejs=require("ejs");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var indice_name='';
var open=0;
var high=0;
var low=0;
var current=0;

app.get("/",function(req,res){
  res.render("index");
});
app.post("/",function(req,res){
  indice_name=req.body.share;
  var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://nse-data1.p.rapidapi.com/equity_stock_indices',
  params: {symbol: indice_name},
  headers: {
    'x-rapidapi-host': 'nse-data1.p.rapidapi.com',
    'x-rapidapi-key': '2c10a421e6msh912b4fa699d8b38p11b31djsn5560fcad7258'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
   open=response.data.body.metadata.open;
   high=response.data.body.metadata.high;
   low=response.data.body.metadata.low;
   current=response.data.body.metadata.last;
  res.render("price",{
    indice_name:indice_name,
    open:open,
    high:high,
    low:low,
    current:current
  });

}).catch(function (error) {
	console.error(error);
});
});
app.get("/insights",function(req,res){
  res.render("insights");
});
app.get("/transactions",function(req,res){
  res.render("transactions");
});
app.get("/aboutus",function(req,res){
  res.render("aboutus");
});
app.get("/buy",function(req,res){
  res.render("buy",{
    indice_name:indice_name,
    open:open,
    high:high,
    low:low,
    current:current
  });
});
app.get("/sell",function(req,res){
  res.render("sell");
});

app.listen(3000,function(){
  console.log("server up and running on port 3000");
});
