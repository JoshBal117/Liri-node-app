/* The following are the Deoendacies of the Liri App
    they are also the starting global variables to assist in creating the 
    data provided to the user's request
*/

//These are the enviroment vairables
require("doteenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify)


//This is the function that will use the BandsinTown to locate the conert

var concertThis = function(artist) {
    var region = ""
    var queryUrl = "https://rest.bandsintown.com/artist/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
}