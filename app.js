require = require("esm")(module);
const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const ejs=require("ejs");
const stock=require(__dirname+"/stock.js");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var symbol='';
var open=0;
var high=0;
var low=0;
var current=0;
var transactions=[];
var quantity=0;
app.get("/",function(req,res){
  res.render("aboutus");
});
app.post("/index",function(req,res){
  symbol=req.body.share;
  let k=stock.getPrice(symbol);
  k.then(data => { open=data.priceInfo.open;
    low=data.priceInfo.intraDayHighLow.min;
    high=data.priceInfo.intraDayHighLow.max;
    current=data.priceInfo.lastPrice;
    res.render("price",{
      symbol:symbol,
      open:open,
      high:high,
      low:low,
      current:current
    });});
});
app.get("/insights",function(req,res){
  res.render("insights");
});
app.get("/transactions",function(req,res){
  res.render("transactions",{transactions:transactions});
});
app.get("/index",function(req,res){
  res.render("index");
});
app.get("/buy",function(req,res){
  res.render("buy",{
    symbol:symbol,
    open:open,
    high:high,
    low:low,
    current:current
  });
});
app.post("/buy",function(req,res){
  quantity=req.body.quantity;
  const price_paid=current*quantity;
  transaction={
    symbol:symbol,
    quantity:quantity,
    current:current,
    price_paid:price_paid
  };
  transactions.push(transaction);
  console.log(transactions);
  res.redirect("index");
});
app.get("/sell",function(req,res){
  res.render("sell");
});

app.listen(3000,function(){
  console.log("server up and running on port 3000");
});
