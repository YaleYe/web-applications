const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const sessions = require('express-session');

const path = require('path');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //https://codeforgeek.com/handle-get-post-request-express-4/

//load view
app.set('views',path.join(__dirname,"views"));
app.set("view engine","pug");

var session;
var orders = [];
var username = "";
var item = "";
var items = [];
app.use(bodyParser());

//redirect to login page
app.get("/",(request,response)=> {
    response.redirect("/login");
  });

//request from login page
app.get("/login",(request,response)=>{
  //ouput the pug file
  response.render("login");
});

//get username and store it and redirect to shop page
app.post("/login",(request,response)=>{
    session = request.session;
    username = request.body.username;
    //redirect to the shop page
    response.redirect("/shop");
});
//http://localhost:3000/shop

//get shop page
app.get("/shop",(request,response)=>{
  session = request.session;
  response.render("shop",{username: username,items:items});
});

//move to order
app.post("/shop",(request,response)=>{
  session = request.session;
  item = request.body.item;
  items.push(item);
  response.redirect("/shop");

});


app.get("/orders",(request,response)=>{
  session = request.session;
  response.render("orders",{username: username,items:items});
});

app.post("/orders",(request,response)=>{
  session = request.session;
  response.render("orders",{username: username,items:items});
});



const port = 3000;

app.listen(port,()=> console.log('Server started on port 3000'));
