var db = require("../models");
const igdb = require("igdb-api-node").default;
const keys = require("../config/keys.js");
var moment = require("moment");

module.exports = function(app) 
{
  /* Get all survey results
  app.get("/api/survey/results", function(req, res) {
    db.Survey.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });*/

  app.get("/api/newest", function(req, res) 
  {
    console.log(req.body);

    var client = new igdb("bb21f87f57037dd21618c694818fe183");

      client.games(
      {
          filters: 
          {
              "first_release_date.date-gt": "2018-08-01",
              "first_release_date.date-lt": "2018-08-31"
          },
          limit: 10,
          //offset: 0,
          order: "first_release_date.date:desc"
      },
      [
          "name",
          "genres",
          "first_release_date",
          "rating",
          "screenshots",
          "popularity"
      ]).then(function(response,err)
      { 
        if (err)
        {
            throw err;
        }
        else
        {
        //create an array to hold the JSON objects that will be passed to the front end
        var newGameObject = [];
        
        //create an object container for individual game data
        var gameObject = {};

        //create variabbles to hold individual game data elements because of dot and bracket notation limitations
        var name;
        var genre;
        var releaseDate;
        var rating;
        var image;

        //loop to process the JSON data received from igdb api
        //igdb has shown that it doesn't always have values for each of the elements we are requesting
        //therefore we must validate the existence of a value for each game object before attempting to store it
        for (var t=0; t<response.body.length; t++)
        {
          if (response.body[t].name == undefined)
          {
            name = "No title assigned for this game ID";
          }
          else
          {
            name = response.body[t].name;
          }
          if (response.body[t].genres == undefined)
          {
            genre = "No genre assigned for this game ID";
          }
          else
          {
            genre = response.body[t].genres[0];
          }
          if (response.body[t].first_release_date == undefined)
          {
            releaseDate = "No release date assigned for this game ID";
          }
          else
          {
            //convert UNIX Epoch time to YYYY-MM-DD format
            releaseDate = moment.unix(response.body[t].first_release_date).format("YYYY-MM-DD");
          }
          if (response.body[t].rating == undefined)
          {
            rating = "No rating assigned for this game ID";
          }
          else
          {
            rating = response.body[t].rating;
          }
          if (response.body[t].screenshots == undefined)
          {
            image = "No screenshot available for this game ID";
          }
          else
          {
            image = "http:" + response.body[t].screenshots[0].url;
          }
          
          //assign api data to properties of an object
          var gameObject = 
          {
            name: name,
            genre: genre,
            releaseDate: releaseDate,
            rating: rating,
            image: image
          };

          //add JSON game object to the array
          newGameObject.push(gameObject);
        }

          //send the game object array (JSON) to the front end for rendering
          res.json(newGameObject);
        }
      }
    //required catch for the igdb api npm package
    ).catch(error => 
        {
          throw error;
        });
    });

  app.get("/api/popular", function(req, res) 
  {
    //passing key literally instead of with a key/.env files
    //tested using keys/env files and get unauthorized status response
    var client = new igdb("bb21f87f57037dd21618c694818fe183");

    client.games(
    {
        limit: 10,
        //offset: 0,
        order: "popularity:desc"
    },
    [
        "name",
        "genres",
        "first_release_date",
        "screenshots",
        "rating",
        "popularity"
    ]).then(function(response,err)
    { 
      if (err)
      {
          throw err;
      }
      else
      {
        //create an array to hold the JSON objects that will be passed to the front end
        var popularGameObject = [];
        
        //create an object container for individual game data
        var gameObject = {};

        //create variabbles to hold individual game data elements because of dot and bracket notation limitations
        var name;
        var genre;
        var releaseDate;
        var image;
        var rating;
        var popularity;

        //loop to process the JSON data received from igdb api
        //igdb has shown that it doesn't always have values for each of the elements we are requesting
        //therefore we must validate the existence of a value for each game object before attempting to store it
        for (var u=0; u<response.body.length; u++)
        {
          if (response.body[u].name == undefined)
          {
            name = "No game title assigned for this game ID";
          }
          else
          {
            name = response.body[u].name;
          }
          if (response.body[u].genres == undefined)
          {
            genre = "No genre assigned";
          }
          else 
          {
            genre = response.body[u].genres[0];
          }
          if (response.body[u].first_release_date == undefined)
          {
            releaseDate = "Unknown first release date";
          }
          else
          {
          //convert UNIX Epoch time to YYYY-MM-DD format
          var releaseDate = moment.unix(response.body[u].first_release_date).format("YYYY-MM-DD");
          }
          if (response.body[u].screenshots == undefined)
          {
            image = "No screenshot available";
          }
          else 
          {
            image = "http:"+response.body[u].screenshots[0].url;
          }
          if (response.body[u].rating == undefined)
          {
            rating = "No rating assigned to this game id";
          }
          else
          {
            rating = response.body[u].rating;
          }
          if (response.body[u].popularity == undefined)
          {
            popularity = "No popularity ranking assigned to this game id";
          }
          else
          {
            popularity = response.body[u].popularity;
          }

          //assign api data to properties of an object
          gameObject = 
          {
            name: name,
            genre: genre,
            releaseDate: releaseDate,
            image: image,
            rating: rating,
            popularity: popularity
          };

          //add JSON game object to the array
          popularGameObject.push(gameObject);
        }

        //send the game object array (JSON) to the front end for rendering
        res.json(popularGameObject);
      }

    //required catch for the igdb api npm package
    }).catch(error => 
      {
        throw error;
      });
  });

  app.get("/api/:id", function(req, res)
  {
    //passing key literally instead of with a key/.env files
    //tested using keys/env files and get unauthorized status response
    var client = new igdb("bb21f87f57037dd21618c694818fe183");

    //capture the genre value from the link
    var genre = req.body.id;

    client.games(
    {
      filters: 
      {
          "genres": genre
      },
      limit: 50,
      //offset: 0,
      order: "name:asc"
    },
    [
      "name",
      "genres",
      "first_release_date",
      "screenshots",
      "popularity",
      "rating"
    ]).then(function(response,err)
    { 
      if (err)
      {
          throw err;
      }
      else
      {
        //create an array to hold the JSON objects that will be passed to the front end
        var genreGameObject = [];
        
        //create an object container for individual game data
        var gameObject = {};

        //create variabbles to hold individual game data elements because of dot and bracket notation limitations
        var name;
        var genre;
        var releaseDate;
        var image;
        var popularity;
        var rating;
        
        for (var d=0; d<response.body.length; d++)
        {
          if (response.body[d].name == undefined)
          {
            name = "No game title assigned for this game ID";
          }
          else
          {
            name = response.body[d].name;
          }
          if (response.body[d].genres == undefined)
          {
            genre = "No genre assigned";
          }
          else 
          {
            genre = response.body[d].genres[0];
          }
          if (response.body[d].first_release_date == undefined)
          {
            releaseDate = "Unknown first release date";
          }
          else
          {
          //convert UNIX Epoch time to YYYY-MM-DD format
          var releaseDate = moment.unix(response.body[d].first_release_date).format("YYYY-MM-DD");
          }
          if (response.body[d].screenshots == undefined)
          {
            image = "No screenshot available";
          }
          else 
          {
            image = "http:"+response.body[d].screenshots[0].url;
          }
          if (response.body[d].rating == undefined)
          {
            rating = "No rating assigned to this game id";
          }
          else
          {
            rating = response.body[d].rating;
          }
          if (response.body[d].popularity == undefined)
          {
            popularity = "No popularity ranking assigned to this game id";
          }
          else
          {
            popularity = response.body[d].popularity;
          }

          //assign api data to properties of an object
          gameObject = 
          {
            name: name,
            genres: genre,
            releaseDate: releaseDate,
            image: image,
            rating: rating,
            popularity: popularity
          };

          //add JSON game object to the array
          genreGameObject.push(gameObject);

        }

        //send the game object array (JSON) to the front end for rendering
        res.json(genreGameObject);
      }
    }
    //required catch for the igdb api npm package
    ).catch(error => 
      {
        throw error;
      });

  });

  //post route for creating new records in the survey table
  app.post("/api/quiz", function(req,res)
  {
    db.Survey.create(
      {
        userid: req.body.userid,
        q01: req.body.q01,
        q02: req.body.q02,
        q03: req.body.q03,
        q04: req.body.q04,
        q05: req.body.q05,
        q06: req.body.q06,
        q07: req.body.q07,
        q08: req.body.q08,
        q09: req.body.q09,
        q10: req.body.q10,
        q11: req.body.q11,
        genre: req.body.genre
      }
    ).then(function(dbSurvey) 
      {
      // We have access to the new todo as an argument inside of the callback function
        res.json(dbSurvey);
    }
    )
    .catch(function(err) 
    {
    // Whenever a validation or flag fails, an error is thrown
      res.json(err);
    });

  });

};