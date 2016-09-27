var http = require("http");
var events =  require("events");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var count = 0;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Headers","*")
	  res.header('Access-Control-Allow-Origin','*')


  next();
});

var names=[]
var registerEventHandler =  function(name,mailid,password){
	console.log(name)
}

var eventEmitter = new events.EventEmitter();
eventEmitter.on("registerEvent",registerEventHandler);


app.get('/',function(req,res,next){

	res.send("helloworld")
})

app.get("/registeruser",function(req,res,next){
	count++;
	console.log("in node js")
	var response = {
		status : count
	}

	res.send(JSON.stringify(response))
})

app.post("/getData",function(req,res,next){

	names.push(req.body.name)
	console.log(names)
	res.send("hi")

})

app.get('/getAllNames',function(req,res,next){
	var allNames = {
		names : names
	}
		  res.header("Access-Control-Allow-Headers",'*')
		  	


	res.send(allNames)
})
 
 var port = Number(process.env.PORT || 8081)

var server = app.listen(port,function(){
	var host = server.address().address
	var port = server.address().port
})