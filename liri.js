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

// function cortanaLiri () {
//     switch (type) {
//         case "concert-this":
//             concertThis() 
//             break;

//         case "spotify-this-song":
//             spottySong()
//             break;
        
//         case "movie-this":
//             findMovie()
//             break;
        
//         case "Do-what-it-says":

        
        
//         default:
//             break;
//     }
// }
//
var type = process.argv[2];

var term = process.argv.slice(3).join(" ");
//This is the function that will use the BandsinTown to locate the concert
    
function concertThis(search) {
        console.log("Finding your conerts...")
    //default Foo Fighters
    if (!search) {
        search = "Foo+Fighters";
    };

    var queryUrl = "https://rest.bandsintown.com/artist/" + search + "/events?app_id=codingbootcamp"
    console.log(queryUrl);

    axios
        .get(queryUrl)
        .then(function(res) {
        console.log("========NEW SHOW LIST========")
        console.log(`Catch ${search} at: \n`);
        for (let i = 0; i < res.data.length; i++) {
            var venue = res.data[i].venue.name;
            var location = res.data[i].venue.city + ", " +res.data[i].venue.region;
            var date = dayjs(res.data[i].datetime).format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');
            console.log(`${venue} in ${location} on ${date}`);
            }
            console.log("\n--------------------------------");
    });
    
}

function spottySong(search) {
    console.log("Finding your song ,,,")
    if(!search) {
        search = "The Sign, Ace of Base";
    }

    sprotify.search({
            type: 'track',
            query: search 
    }, function(err, data) {
        if(err) {
                return console.log('Errpr occurred: ' + err);
        }
        var track = data.tracks.items[0].name; 
        var artist = data.tracks.items[0].album.artists[0].name; 
        var album = data.tracks.items[0].album.name; 
        var preview = data.tracks.items[0].preview_url; 
        console.log("=========NEW SONG=========\n");
        console.log(`Check out "${track}" off of the album '${album}' by '${artist}' here: ${preview}`);
        console.log("\n==========================");
    });
}

function findMovies(search) {
    console.log("Finding your movie...");

    if (!search) {
        search = "Mr. Nobody";
    };

    var queryURL = "https://www.omdbapi.com/?apikey=trilogy&t=" + search;
    
    axios({
        method:'get',
        url: queryURL
    })
    .then(function(res) {
        var title = res.data.Title;
        var year = res.data.Year;
        var imdb = res.data.Ratings[0].Value;
        var rotten = res.data.Ratings[1].Value;
        var country = res.data.Country;
        var language = res.data.Language;
        var plot = res.data.Plot;
        var actors = res.data.Actors;
        console.log("=========NEW MOVIE=========\n");
        console.log(`${title} (${year}): ${plot}. \nThe film was produced in ${country} and available in ${language}. Rated ${imdb} on IMDB and ${rotten} on Rotten Tomatoes. \nStarring: ${actors}. `)
        console.log("\n===========================");
    });
}


if (type === "concert-this") {
    concertThis(term);
} else if (type === "spotify-this-song") {
    spottySong(term)
} else if(type === "movie-this") {
    findMovies(term)
} else if (type === "do-what-it-says") {
    fs.readFile("randome.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        };
    })
}