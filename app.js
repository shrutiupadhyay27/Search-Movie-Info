var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/result",function(req, res){
	var movieName = req.query.search
	var url = 'http://www.omdbapi.com/?s=' + movieName + '&apikey=508bacb1';

	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", { data: data });
		}
	})
})

app.get("/",function(req, res){
	res.render("search");
})

app.get("/detail/:movieID",function(req, res){
	var movieID = req.params.movieID;
	movieID = movieID.substring(1);
	var url = 'http://www.omdbapi.com/?i=' + movieID + '&apikey=508bacb1';
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("detail", { data: data });
		}
	})
})


app.listen(3000, function(){
	console.log("Movie App Started");
})
