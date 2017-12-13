// Initial array of Reactions from Giphy
var topics = ["lol", "sad", "nom", "you got this", "oh snap", "omg", "fist bump", "mic drop", "high five", "yes"];

      // displayTopicInfo function re-renders the HTML to display the appropriate content
      function displayTopicInfo() {

        var submit = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + submit + "&api_key=dc6zaTOxFJmzC&limit=10";         
        
        // Creates AJAX call for the specific catagory button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // storing the data from the AJAX request in the results variable
          var results = response.data;

          $("#catagory-view").empty();

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

          $('#catagory-view').prepend(`
          <div id="inlineBlock">
          <h3>Rating: ${results[i].rating}</h3>
            <img src="${results[i].images.fixed_height_still.url}" class="gif img-thumbnail img-responsive">
          </div>
          `);
        }
          $(".gif").on("click", function() {

            var src = $(this).attr("src");
            if($(this).hasClass('pausePlay')){
               //stop
               $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))  // modifing the actual website link. Removing the .gif and adding the _s.gif if its a still picture.
               $(this).removeClass('pausePlay');
            } else {
              //play
              $(this).addClass('pausePlay');
              $(this).attr('src', src.replace(/\_s.gif/i, ".gif")) // modifing the actual website link. Removing the _s.gif and adding the .gif if its an animated picture.
            }
          });
        
        });

      }

      // Function for displaying catagory data
      function renderButtons() {

        // Deletes the catagory prior to adding new catagorys
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();


        // Loops through the array of catagories
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each funny reaction in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of catagory to our button
          a.addClass("catagory btn btn-primary");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      $("#catagory-view").empty();

      // This function handles events where the add catagory button is clicked
      $("#add-catagory").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var submit = $("#catagory-input").val().trim();

        // The funny reaction from the textbox is then added to our array
        topics.push(submit);

        // Calling renderButtons which handles the processing of our catagory array
        renderButtons();

      });

      // Adding click event listeners to all elements with a class of "catagory"
      $(document).on("click", ".catagory", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();