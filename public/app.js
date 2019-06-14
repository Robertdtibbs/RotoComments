$.getJSON("./articles", data => {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on('click', 'p', function () {
    $("#notes").empty();
    var thisId = $(this).attr('data-id');

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

        .then(data => {
            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (data.note) {
                $('#titleinput').val(data.note.title);
                $("bodyinput").va(data.note.body);
            }
        })
})

$(document).on("click", "#savenote", function(){

    var thisId = $(this).attr('data-id');

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bobyinput").val()
        }
    }).then( data => {
        console.log(data);
        $('#notes').empty();
    })
    $("#titleinput").val('');
    $("#bodyinput").val('');
})