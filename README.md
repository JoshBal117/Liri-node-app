# Liri-node-app
Liri app 
===========================
ABOUT
============================
This application allows a user to make a request for information about concerts, songs, movies by way of command lines, IT utilizes Bands In Town, Spotify, and OMDB API's along with a series of node modules to assis with the requests. This application was created by Joshua Balao
Directions on how to use it ae below.
=======================================

GETTING STARTED
===============================
Please ensure that you install the following dependencies

AXIOS
DOTENV
DAYJS
NODE-SPOTIFY-API

Please see the Package.json which whill have more information
==============================================================
These are the commands that can be typed into the command line
1. concert=this(band/music artist)
    Returns upcoming shows from the requested artist to the console

2. spotify-this-song (song name)
    This Returns album information from the inputted song, and a preview snippet of the URL, to the console

3. movie-this (movie title)
    By typing this command will return production details from the requested movie, along with the plot and cast, to the console.

4. do-what-it-sys
    This Reads the text in the Randome.txt file and runs the approriate function to return the information to the console. 

=====================================================================

RESOURCES:

This Project makes use of:
    AXIOS-Make HTTP Requests
    DAYJS-formats times
    DOTENV-Hides API Keys
    NODE-SPOTIFY-API: Retrieves song information
    OMDB API - Retrieves movie information
    BANDS IN TOWN API - Retrieve show information
