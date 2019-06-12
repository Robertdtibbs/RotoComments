var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var axios = require('axios');
var cheerio = require('cheerio');

var PORT = 3000;

var app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/RotoComments", { useNewUrlParser: true});


app.get("/scrape", function(req, res){

    axios.get("https://www.rotoworld.com/football/nfl/player-news").then(function(response){
        
        var $ = cheerio.load(response.date);

        var results = [];

        $("div.player-news-article__body").each(function(i, element){

            var title = $(element).children().text();
            
        })
    })
})