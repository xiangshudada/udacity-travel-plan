const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api_request = require('./apiRequest');

// server definitions
const PORT = 8081;
const app = express();

// dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

// routes
app.get('/', (req, res) => {
	res.sendFile(path.resolve('dist/index.html'));
});

app.post('/geonames', (req, res) => {
	const url = `http://api.geonames.org/searchJSON?q=${req.body.city}&username=mjwille`;
	const api_res = api_request.makeApiRequest(url, false);
	//
	if(api_res.geonames.length !== 0) {
		const {lat, lng, countryName} = api_res.geonames[0];
		res.send({lat, lng, countryName});
	}
	else {
		res.send({});
	}
});

app.post('/weatherbit', (req, res) => {
	const API_KEY = "1ce785fb797d4ec48479015d9536305a";
	const date = req.body.date.slice(5,10);
	const url = `http://api.weatherbit.io/v2.0/normals?lat=${req.body.lat}&lon=${req.body.lng}&start_day=${date}&end_day=${date}&key=${API_KEY}`;

	const api_res = api_request.makeApiRequest(url, false);
	const {snow, max_temp, temp, min_temp, precip} = api_res.data[0];
	res.send({snow, max_temp, temp, min_temp, precip});
});

app.post('/pixabay', (req, res) => {
	const API_KEY = "17196459-9d2e71b4f8a538e36f1e365a5";
	const url = `https://pixabay.com/api/?key=${API_KEY}&q=${req.body.city}&image_type=photo`;
	const api_res = api_request.makeApiRequest(url, false);
	const img = api_res.hits[0].webformatURL;
	res.send({img});
});

// server creation
const server = app.listen(PORT, () => {
	console.log(`Server is up. Listening on port ${PORT}.`);
});

module.exports = server  // for the server test