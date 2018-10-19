const bodyParse = require('body-parser');
const express = require('express');
const request = require('request');
const app = express();
const port = 8080;

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static('client/dist'));

const movies = [
  {
  	id: 1,
    title: 'Mean Girls',
    year: 1995,
    imdbRating: 6.2,
    overview: "None",
    watched: true,
  },
  {
  	id: 2, 
    title: 'Hackers',
    year: 2010,
    imdbRating: 7.2,
    overview: "None",
    watched: false
  }
]

app.get('/api/movies', (req, res, next) => {
	// const url = 'https://api.themoviedb.org/3/movie/550?api_key=e3352f199c561005427890c0778e6ce9';
	// request(url, function(error, response, body) {
  //       res.json(body)
	// });
	res.send(JSON.stringify({movies}));
});

app.listen(port, () => {
	console.log(`Listening in port... ${port}`);
});
