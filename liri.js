//We will first get liri to extract the keys and store it in a variable//
//Once stored, we can then use the data to create a function to use the commands requested to perform the operation for liri to perform//
//****************************************************However, it needs to use the data entered by the user to match and then perform a check to see if the words match. With that liri would take the next word or string to perform the action that they are requesting***********************************************//

//First the users entered data has to be collected and stored//
//All the input would be stored in avariable in the form of an array//
var input = process.argv;
//Also now we would store the words from the random.txt file into a variable//
// var fs = require("fs");
var request = require("request");

var keys = require("./keys.js");

var getMovie = keys.omdb.lock;

// fs is an NPM package for reading and writing files//
var fs = require("fs");



//This is the keywords that it would look for and then look for the form in the text file//
var secretWord = input[2];

var spotify = require('spotify');
runSwitch();

//Now it would then compare it with the random.txt and pass the function to perform the appropriate function accordingly//
function runSwitch(){
switch (secretWord) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spot();
        break;

    case "movie-this":
        movies();
        break;

    case "do-what-it-says":
        doing();
        break;

}
}

//************This is where the twitter functions would be used */////////////////////////
function tweets() {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret,
    });
    console.log(client);

    var params = {
        screen_name: 'nodejs'
    };
    client.get('statuses/user_timeline', {
        count: 20,
        screen_name: "kurogosane1"
    }, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });


}



//*******Movie functionality to enter here****************************************//
function movies() {
    var movieName = '';
    for (var i = 2; i < input.length; i++) {

        if (i > 2 && i < input.length) {
            movieName ='';
            movieName = movieName + input[i];
            console.log('this is line 82 '+ movieName );
            // console.log('this is line 129'+ search);

        } 
        else //by default the movie search would always end up going to search for Mr.Nobody// 
        {   
            movieName = 'Mr.Nobody';
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // Then create a request to the queryUrl
    // ...
    request(queryUrl, function (error, response, body) {




        console.log('the thing entered in line 88 is' + movieName);

        // If the request is successful
        // ...
        if (!error && response.statusCode === 200) {
            // Then log the Release Year for the movie
            // ...
            console.log(body);
            console.log("The movie title: " + JSON.parse(body).Title);
            console.log('IMDB rating' + "" + JSON.parse(body).imdbRating);
            console.log('The country produced:' + '' + JSON.parse(body).Country);
            console.log("The movie was released in the year: " + JSON.parse(body).Year);;
            console.log('The Actors in the movie: ' + JSON.parse(body).Actors);
            console.log('Rotten Tomato ratings: ' + JSON.parse(body).Metascore);
            console.log('Link: ' + JSON.parse(body).Poster);
        }

    })
};
// Spotify search function //
function spot() {
    //By default the song that would be used to search for is I want it that a way//
    var search = 'I want it that a way';
    //if the user enters a song or the song is longer than one word, then below for statement would be used to perform that action//
    for (var i = 2; i < input.length; i++) {

        if (i > 2 && i < input.length) {
            search ='';
            search = search + input[i];
            // console.log('this is line 129'+ search);

        } 
        //however if the user enters nothing besides the keywords, then the default song is selected below//
        else{
            search = 'I want it that a way';
        }
    }
//the spotify npm package
    spotify.search({
        type: 'track',
        query: search
    }, function (err, data) {
        
        var response = data;
             
        
        if (err) {
            console.log('Error occurred: ' + err);
            return; //from spotify npm docs
        } else {
            for (var i = 0; i < response.tracks.items.length; i++) {
                //This is based on the response that is receivied by the user for the song or artist
                console.log('song name is : ' + response.tracks.items[i].album.name);
                console.log("Album Artist(s) is : " + response.tracks.items[i].album.artists);
                console.log("link to preview : " + response.tracks.items[i].preview_url);
            }
            
            
        };

    })
};

//************************************************************************************************************************************* *//
//Do thing function is performed by the selected word action//
function doing(){
    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)//
    // The code will store the contents of the reading inside the variable "data"   //
    fs.readFile("random.txt", "utf8", function(error, data) {

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        var max= dataArr.length;
        var randomNo = Math.floor(Math.random() * (max - 0 + 1)) + 0;
        console.log(randomNo);
        secretWord = dataArr[randomNo];
        console.log(secretWord);
        runSwitch(secretWord);
        // if (secretWord=='spotify-this-song')
        // {
        //     spot();
        // }
        // else{
        //     movies();
        // }
        // We will then re-display the content as an array for later use.
        
        

    });
}
