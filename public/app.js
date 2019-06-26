
function displayArticles(){
  // Grab the articles as a json
  $.getJSON("/articles", function(data) {
    // Clear out old articles.
    $('#articles').empty();
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      // $("#articles").append("<div><img src ='" + data[i].img + "'>", "<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].body + "<br />" + data[i].link + "</p></div>");
      $("#articles").append("<div><img src ='" + data[i].img + "'><div data-id='" + data[i]._id + "'>" + "<h3>" + data[i].title + "</h3><p>" + data[i].body + "<br /> <a href = 'https://www.premierleague.com/" + data[i].link + "'> Read Article </a></p></div></div>" )
    }
  });
}




// Whenever someone clicks a p or img tag
$(document).on("click", "img", function() {
  
  
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Empty the notes from  the note section
  $("#notes").empty();

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h3> Comment on Article </h3>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#scrape", function(){
  $.get("./scrape").then( displayArticles)
})