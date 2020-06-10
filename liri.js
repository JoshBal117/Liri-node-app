/* The following are the Dependacies of the Liri App
    they are also the starting global variables to assist in creating the 
    data provided to the user's request
*/

//These are the enviroment vairables
require("dotenv").config();
//this the spotify api key
var Spotify = require("node-spotify-api");
var axios = require("axios")
var keys = require("./keys.js")
var request = require("request")
var fs = require("fs")
var spotify = new Spotify(keys.spotify)
const dayjs = require("dayjs")

//
var type = process.argv[2];

var term = process.argv.slice(3).join(" ");
//This is the function that will use the BandsinTown to locate the conert
function switchCase() {

    switch (type) {
        case "concert-this":
            bandsInTown(parameter)
            break;
    
        case "spotify-this-song":
            spottySong(parameter)
            break;
    
        case "movie-this":
            movieInfo(parameter)
            break;
    
        case "do-what-it-says":
            getRandom()
            break;
    
        default:
            logIt("Invalid Instruction")
            break;
    }
}

function concertThis(search) {
        console.log("Finding your conerts...")
    //default AC/DC
    if (!search) {
        search = "AC/DC";
    };

    var queryUrl = "https://rest.bandsintown.com/artist/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
    console.log(queryUrl);

    axios({
        method: 'get',
        url: queryUrl
    })
    .then(function bandsInTown(parameter) {
        console.log("========NEW SHOW LIST========")
        console.log('Catch ${search} at: \n');
        for (let i = 0; i < res.data.length; i++) {
            var venue = res.data[i].venue.name;
            var location = res.data[i].venue.city + ", " +res.data[i].venue.region;
            var date = dayjs(res.data[i].datetime).format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');
            console.log('${venue} in ${location} on ${date}');
            }
    })
    
}


//This is function for the Spotify
