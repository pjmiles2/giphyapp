$(document).ready(function(){



var topics = ["Ford","Toyota","BMW","Chevrolet","Volvo","Honda"];



function buttons() {

    $("#car-button").empty();

    for (var i=0; i < topics.length; i++) {


    var button = $("<button>");
    button.addClass("car");

    button.attr("car-make", topics[i]);

    button.text(topics[i]);

    $("#car-button").prepend(button);


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
    // In this case, the "this" keyword refers to the button that was clicked
    var carType = $(this).attr("car-make");
console.log(carType);
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      carType + "&api_key=6fOVXGhpoNJ0kP6tgH9TwXLuIDHf1C3N&limit=10";
      console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");
            var carImage = $("<img>");

            carImage.attr("src", results[i].images.fixed_height_still.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            //gifDiv.append(p);
            gifDiv.prepend(carImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-view").prepend(gifDiv);
          }
        
        }
)}
      
)});
