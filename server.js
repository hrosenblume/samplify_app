// set variables for environment
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var plotly = require('plotly')('imshivs','xno4z8y59z');

var app = express();
app.use(express.static(__dirname + '/views'));
app.use(express.static('public'));
app.use(bodyParser());

//viewing engine shit
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//  routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/input', function(req, res) {
	var option = req.body.option;
	switch(option) {
		case "radar":
			//render radar option page
			res.render('artistsFormRadar');
			break;
		case "nodes":
			res.render('songForm');
			//render nodes option page
			break;
		case "histogram":
			res.render('artistsFormHistogram');
			//render histogram option page
			break;
	}
});

app.post('/histogram', function(req, res) {
	var artist = req.body.artist_one;
	artist = artist.trim();
	artist = artist.split(' ').join('+');
	artist = artist.toLowerCase();

	url = "http://samplify-api.herokuapp.com/years/" + artist;
	callback = function(response) {
		var str;

		response.on('data', function(html) {
			str += html;
		});

		response.on('end', function() {
			console.log('THIS WAS HIT');
			if (str == "Error 404") {
				res.render('404');
			} else {
				console.log('THIS WAS HIT 2');
				artist = artist.split('+').join(' ');
				artist = toTitleCase(artist);
				res.render('histogram', {
					data: str,
					artist: artist
				});
			}
		});
	}

	var req = http.request(url, callback);
	req.end();
});

app.post('/radar', function(req, res) {
	var artist = req.body.artist_one;
	artist = artist.trim();
	artist = artist.split(' ').join('+');
	artist = artist.toLowerCase();

	url = "http://samplify-api.herokuapp.com/genres/" + artist;
	callback = function(response) {
		var str;

		response.on('data', function(html) {
			str += html;
		});

		response.on('end', function() {
			console.log('THIS WAS HIT');
			if (str == "Error 404") {
				res.render('404');
			} else {
				console.log('THIS WAS HIT 2');
				artist = artist.split('+').join(' ');
				artist = toTitleCase(artist);
				res.render('radar', {
					data: str,
					artist: artist
				});
			}
		});
	}

	var req = http.request(url, callback);
	req.end();
});

app.post('/nodes', function(req, res) {
	var song = req.body.song;
	song = song.trim();
	song = song.split(' ').join('+');
	song = song.toLowerCase();

	url = "http://samplify-api.herokuapp.com/samples/" + song;
	callback = function(response) {
		var str;

		response.on('data', function(html) {
			str += html;
		});

		response.on('end', function() {
			console.log('THIS WAS HIT');
			if (str == "Error 404") {
				res.render('404');
			} else {
				console.log('THIS WAS HIT 2');
				res.render('nodes', {
					locals: {
						data: str
					}
				});
			}
		});
	}

	var req = http.request(url, callback);
	req.end();
});

// set server port
app.listen(process.env.PORT || 4000);
console.log('magic happens on port 4000');
exports = module.exports = app;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
