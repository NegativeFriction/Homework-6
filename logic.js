$(document).ready(function() {
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

  var buttonSubject;
  buttonDrawer();

  function buttonDrawer() {
    $("#categories").empty();
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button class = 'topicButton'>");
      newButton.text(topics[i]);
      $("#categories").append(newButton);
    }
  }

  $(document).on("click", ".topicButton", function() {
    buttonSubject = $(this).text();
    ajaxCall();
  });

  $(document).on("click", ".gif", function() {
    if ($(this).attr("data-state") === "paused") {
      $(this).attr("data-state", "animated");
      $(this).attr("src", $(this).attr("data-moving"));
    } else {
      $(this).attr("data-state", "paused");
      $(this).attr("src", $(this).attr("data-still"));
    }
  });

  $("#searchButton").on("click", function() {
    event.preventDefault();
    topics.push($("#gifToSearch").val());

    buttonSubject = $("#gifToSearch").val();
    ajaxCall();
    $("#gifToSearch").val("");

    buttonDrawer();
  });

  function ajaxCall() {
    $("#gifDisplayArea").empty();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      key +
      "&q=" +
      buttonSubject +
      "&offset=0&rating=PG&lang=en&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var container = $("<div class='container'>");
        var newImg = $("<img class = 'gif'>");
        newImg.attr("src", response.data[i].images.fixed_height_still.url);
        newImg.attr(
          "data-still",
          response.data[i].images.fixed_height_still.url
        );
        newImg.attr("data-moving", response.data[i].images.fixed_height.url);
        newImg.attr("data-state", "paused");
        var descriptorDiv = $("<p>");
        descriptorDiv.attr("class", "descriptor");
        descriptorDiv.text("rating: " + response.data[i].rating);
        $(container).append(newImg);
        $(container).append(descriptorDiv);
        $("#gifDisplayArea").append(container);
      }
    });
  }
});
