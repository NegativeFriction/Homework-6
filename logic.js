$(document).ready(function() {
  console.log("ready!");

  var topics = [
    "Star Wars",
    "Indiana Jones",
    "Pacific Rim",
    "The Room",
    "Marvel Movies",
    "Batman",
    "Stargate",
    "The Princess Bride"
  ];
  var key = "Jw4O2FCSkhYkZttjtxqhnDEG3vSMwSIU";
  var key2 = "Jw4O2FCSkhYkZttjtxqhnDEG3vSMwSIU";
  var buttonSubject = "beer";

  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button class = 'topicButton'>");
    newButton.text(topics[i]);
    $("#categories").append(newButton);
  }

  $(document).on("click", ".topicButton", function() {
    console.log("Click");
    buttonSubject = $(this).text();
    ajaxCall();
  });

  function ajaxCall() {
    $("#gifDisplayArea").empty();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      key +
      "&q=" +
      buttonSubject +
      "&offset=0&rating=PG&lang=en&limit=10";
    console.log("called ajax");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
      //   var newImg = $("<img>");
      //   newImg.attr("src", response.data[0].images.fixed_height.url);
      //   $("#gifDisplayArea").append(newImg);
      for (var i = 0; i < response.data.length; i++) {
        var newImg = $("<img>");
        newImg.attr("src", response.data[i].images.fixed_height.url);
        $("#gifDisplayArea").append(newImg);
        // console.log(newImg);
      }
    });
  }

  ajaxCall();
});
