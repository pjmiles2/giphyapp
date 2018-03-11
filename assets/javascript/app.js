$(document).ready(function(){


var button;
var topics = ["Ford","Toyota","BMW","Chevrolet","Volvo","Honda"];

 


buttons();

   

function carGifs() {

    $("#gifs-view").empty();
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

            var rating = results[i].rating;
            var images = results[i].images;

            var gifDiv = $("<div class='item'>");
            var rated = $("<p>").text("Rating: " + rating);
            var carImage = $("<img>");

            var still = images.fixed_height_still.url;
            var moving = images.fixed_height.url;

            carImage.attr("src", still);
            carImage.attr("data-still", still);
            carImage.attr("data-animate", moving);
            carImage.addClass("gif");

            gifDiv.append(rated);
            gifDiv.append(carImage);

            $("#gifs-view").prepend(gifDiv)
          }
    });
 };



 $("#add-car").on("click", function(event) {
   
    event.preventDefault();        
    var car = $("#car-make").val().trim();
    topics.push(car);
        
    console.log(topics);  
    buttons();  
    });  

function buttons() {

    $("#car-button").empty();

    for (var i=0; i < topics.length; i++) {


    button = $("<buttontype='button' class='btn btn-primary'>");
    button.addClass("car");
    button.attr("car-make", topics[i]);
    button.text(topics[i]);

    $("#car-button").append(button);
    


    }

 
}

  

function moveGifs() {
           
  //  var state = $(this).attr("data-state");
  
    var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "moving");            
        }
            else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
    
    };

$(document).on("click", ".gif", moveGifs);

$(document).on("click", ".car", carGifs);



});
