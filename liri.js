const dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api")
const keys = require("./keys.js");
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const moment = require("moment")

var spotify = new Spotify(keys.spotify)




//=======================================================
//variable for command 
// let command = process.argv[2];
// let secondCom = process.argv[3];

// ********** I ADDED YOUR SWITCH INSIDE OF A FUNCTION, SO WE CAN RE USE AN RE CALL THE SWITCH WHENEVER WE WANT.
let actionable = function (command, secondCom) {

    switch (command) {
        case ("concert-this"):
            concertThis(secondCom);
            break;
        case "spotify-this-song":
            spotifyThis(secondCom);
            break;
        case "movie-this":
            movieThis(secondCom);
            break;
        case "do-what-it-says":
            doWhat();
            break;
        default: console.log("Try Again")
            break;
    };
}


function spotifyThis(song) {
    spotify.search({ type: "track", query: song, limit: 1 }, function (err, data) {
        if (!err) {
            for (let i = 0; i < data.tracks.items.length; i++) {
                let songData = data.tracks.items[i];

                //artist
                console.log("Artist: " + songData.artists[0].name);

                //console log song name
                console.log("Song: " + songData.name);

                //console log preview link
                console.log("Preview: " + songData.preview_url);

                //console log album name
                console.log("Album: " + songData.album.name);
            }
        } else {
            console.log("err");
        }
    });
}

function movieThis(secondCom) {
    let queryUrl = "http://www.omdbapi.com/?t=" + secondCom + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMdB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Rotten Tomatoes URL: " + response.data.tomatoURL);
        })
        .catch(function (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(err.response.data);
                console.log("---------------Status---------------");
                console.log(err.response.status);
                console.log("---------------Status---------------");
                console.log(err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                // `err.request` is an object that comes back with details pertaining to the err that occurred.
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an err
                console.log("err", err.message);
            }
            console.log(err.config);
        });

}

function concertThis(artist) {
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {

        // Saving response into variable 
        let concerts = response.data;

        // Loop through response data array to obtain specific data from bands in town api
        for (let i = 0; i < concerts.length; i++) {

            // Displaying venue info
            console.log("Venue: " + concerts[i].venue.name);
            console.log("City: " + concerts[i].venue.city);
            // Using moment.js to convert date of event to a more user-friendly format
            console.log("Event Date: " + moment(concerts[i].datetime).format("MM/DD/YYYY"));

        }

    })
        .catch((error) => {
            if (error) {
                console.log(error)
            }
        })
}

function doWhat() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        let randomTxt = data.split(',');
        // AFTER THE FILE IS READ AND SPLIT, WE'RE GOING TO CALL THE FUNCTION THAT CONTAINS THE SWITCH, AND WE'RE GOING TO GIVE
        // THE ELEMENTS IN THE TXT FILES AS ARGUMENTS, WHICH WILL RUN THE SWITCH. BASICALLY randomTxt[0] IS ASSIGNED IN THE SWITCH TO command 
        // AND randomTxt[1] is assigned to secondCom and the switch will run with the proper parameters.
        actionable(randomTxt[0], randomTxt[1]);
    })
};

actionable(process.argv[2], process.argv[3]);