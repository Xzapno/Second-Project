var db = require("../models");
const igdb = require("igdb-api-node").default;
var moment = require("moment");

module.exports = function (app) {

    // Load index page

    app.get("/", function (req, res) {
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
            ]).then(function (response, err) 
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
                    for (var u = 0; u < response.body.length; u++) 
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
                        else {
                            //convert UNIX Epoch time to YYYY-MM-DD format
                            //var releaseDate = moment.unix(response.body[u].first_release_date).format("YYYY-MM-DD");
                            //releaseDate = moment.unix(response.body[u].first_release_date).format("dddd, MMMM Do, YYYY");
                            releaseDate = moment(response.body[u].first_release_date).format("YYYY-MM-DD");
                        }
                        if (response.body[u].screenshots == undefined) 
                        {
                            image = "No screenshot available";
                        }
                        else 
                        {
                            image = "http:" + response.body[u].screenshots[0].url;
                        }
                        if (response.body[u].rating == undefined) 
                        {
                            rating = "No rating assigned to this game id";
                        }
                        else 
                        {
                            rating = response.body[u].rating.toFixed(2);
                        }
                        if (response.body[u].popularity == undefined) 
                        {
                            popularity = "No popularity ranking assigned to this game id";
                        }
                        else 
                        {
                            popularity = response.body[u].popularity.toFixed(2);
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
                }

                return popularGameObject
            }).then((popularGameObject) => 
            {
                client.games(
                    {
                        filters:
                        {
                            "first_release_date-gt": "2018-01-01",
                            "first_release_date-lt": "2018-08-31"
                        },
                        limit: 10,
                        //offset: 0,
                        //order: "first_release_date:desc"
                    },
                    [
                        "name",
                        "genres",
                        "first_release_date",
                        "rating",
                        "screenshots",
                        "popularity"
                    ]).then(function (response, err) 
                    {
                        if (err) 
                        {
                            throw err;
                        }
                        else 
                        {

                            //console.log(response)
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
                            for (var t = 0; t < response.body.length; t++) 
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
                                if (response.body[t].first_release_date == undefined) {
                                    releaseDate = "No release date assigned for this game ID";
                                }
                                else 
                                {
                                    //convert UNIX Epoch time to YYYY-MM-DD format
                                    releaseDate = moment(response.body[t].first_release_date).format("YYYY-MM-DD");
                                    //releaseDate = moment.unix(response.body[t].first_release_date).format("dddd, MMMM Do, YYYY");
                                }
                                if (response.body[t].rating == undefined) 
                                {
                                    rating = "No rating assigned for this game ID";
                                }
                                else 
                                {
                                    rating = response.body[t].rating.toFixed(2);
                                }
                                if (response.body[t].screenshots[0].url == undefined) 
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
                        }

                        res.render("index", { newGameObject, popularGameObject });
                    })

                    .catch(error => 
                    {
                        throw error;
                    });
            })

            .catch(error => 
            {
                throw error;
            });

        // Logic for new games..........................


    });

    // Load quiz page

    app.get("/quiz", function (req, res) 
    {
        res.render("quiz", {});
    });

    // Load join page

    app.get("/join", function (req, res) 
    {
        res.render("join", {});
    });

    // Load login page

    app.get("/login", function (req, res) 
    {
        res.render("login", {});
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) 
    {
        res.render("404");
    });

    app.get("/search/:id", function (req, res) 
    {
        //send the game object array (JSON) to the front end for rendering
        res.render("search", {searchObject});
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) 
    {
        res.render("404");
    });
};