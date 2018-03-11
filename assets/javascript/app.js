$(document).ready(function(){



var topics = ["Ford","Toyota","BMW","Chevrolet","Volvo","Honda"];



function buttons() {

    $("#car-button").empty();

    for (var i=0; i < topics.length; i++) {


    var button = $("<button>");
    button.addClass("car");

    button.attr("car-make", topics[i]);

    button.text(topics[i]);

    $("#car-button").append(button);


    }
};
buttons();

$("#add-car").on("click", function(event) {
   
    event.preventDefault();

    // This line will grab the text from the input box
    var car = $("#car-make").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(car);

console.log(topics);  
buttons();

});



$("button").on("click", function() {
    var carType = $(this).attr("car-make");
    console.log(carType)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      carType + "&api_key=6fOVXGhpoNJ0kP6tgH9TwXLuIDHf1C3N&limit=10";
      console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");
            var carImage = $("<img>");

            carImage.attr("src", results[i].images.fixed_height_still.url);

            gifDiv.prepend(carImage);

            $("#gifs-view").append(gifDiv).css('display', 'inline');
          }
        
        }
)}
      
)});
