var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var axios = require('axios');
var cheerio = require('cheerio');

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/eplTalk", { useNewUrlParser: true });


axios.get("https://www.premierleague.com/news").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("section.featuredArticle").each(function(i, element) {

    var img = $(element).find("img").attr("src")
    var title = $(element).find("span.title").text();
    var body = $(element).find("span.text").text();
    var link = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      body : body,
      link: "https://www.premierleague.com" + link,
      img: img
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

// app.get("/scrape", function (req, res) {

//     axios.get("http://www.echojs.com/").then(function (response) {

//         var $ = cheerio.load(response.date);


//         $("article h2").each(function (i, element) {
//             var result = {};

//             result.title = $(this)
//                 .children()
//                 .text();
//             // result.link = $(this)
//             //     .find("a")
//             //     .attr("href");

//             db.Article.create(result)
//               .then(function(dbArticle) {
//                 console.log(dbArticle);
//               })
//               .catch(function(err) {
//                 console.log(err);
//               });
//         });
//         res.send("Scrape Complete");
//     })
// })

app.listen(PORT, function () {
    console.log("App running on port " + PORT)
})