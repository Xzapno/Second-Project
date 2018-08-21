$(document).ready(function()
{
    $("#submit").on("click", function(event) 
    {
     event.preventDefault();
  
     // Form validation
     function validateForm() 
     {
      //assume everything is filled out
      var valid = true;
  
      //checks that the to two form fields at the top of the survey are not empty
      $(".form-control").each(function() 
      {
       if ($(this).val() === "") 
       {
        valid = false;
       }
      });
    
      //checks that each of the drop down fields are not empty
      $(".chosen-select").each(function() 
      {
       if ($(this).val() === "") 
       {
        valid = false;
       }
      });
  
      //returns boolean value of true or false, everything good or something is missing
      return valid;
     }
    
     //if isValid is true
     if (validateForm()) 
     {

      var mode = function mode(arr) 
      {

        var numMapping = {};
        var greatestFreq = 0;
        var mode;
        arr.forEach(function findMode(number) 
        {
          numMapping[number] = (numMapping[number] || 0) + 1;
      
          if (greatestFreq < numMapping[number]) 
          {
              greatestfreq = numMapping[number];
              mode = number;
          }

          return mode;
        });
      };

      var surrveyArray = 
      [        
        $("#q01").val(),
        $("#q02").val(),
        $("#q03").val(),
        $("#q04").val(),
        $("#q05").val(),
        $("#q06").val(),
        $("#q07").val(),
        $("#q08").val(),
        $("#q09").val(),
        $("#q10").val(),
        $("#q11").val()
      ];

      // Create an object for the survey participants data including all of their scores and mode
      var surveyData = 
      {
        //userid value of 0 is just a place holder for where we need to put either the primary key of 
        //the user's record in the user table or their username
        userid: 0,
        q01: $("#q01").val(),
        q02: $("#q02").val(),
        q03: $("#q03").val(),
        q04: $("#q04").val(),
        qo5: $("#q05").val(),
        q06: $("#q06").val(),
        q07: $("#q07").val(),
        q08: $("#q08").val(),
        q09: $("#q09").val(),
        q10: $("#q10").val(),
        q11: $("#q11").val(),
        genre: mode(surveyArray)
      };
    
      //post the data via the API
      $.post("/api/quiz", surveyData, function(data) {
      /*
         // Grab the result from the AJAX post so that the best match's name and photo are displayed.
         $("#match-name").text(data.name);
         $("#match-img").attr("src", data.photo);
    
         // Show the modal with the best match
         $("#results-modal").modal("toggle");
    
        });*/
      });
    }
    else 
    {
    alert("Please fill out all fields before submitting!");
    }
  
    });

});
