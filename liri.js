require("doteenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify)