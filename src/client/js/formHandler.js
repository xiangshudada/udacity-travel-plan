/* URLs for the API calls on the server */
const GEONAMES_URL   = 'http://localhost:8081/geonames';
const WEATHERBIT_URL = 'http://localhost:8081/weatherbit';
const PIXABAY_URL    = 'http://localhost:8081/pixabay';
/* The API Keys were put on the server side */

const apiRequest = async (url='', data={}) => {

	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const data = await res.json();
		return data;
	}
	catch(err) {
		console.log('Error making API request.');
	}
}

function handleSubmit(event) {
	event.preventDefault();

	const dest_element = event.target.parentElement.querySelector('#destination');
	const date_element = event.target.parentElement.querySelector('#date');

	const destination = dest_element.value;
	const date = date_element.value;

	// reset the input styles before checking for new errors
	event.target.parentElement.style.border = 'initial';
	document.querySelector('#destination').style.border = '2px solid black';
	document.querySelector('#date').style.border = '2px solid black';

	// check if both fields are not empty
	if(Client.notEmptyInput(destination, date)) {
		// makes the 3 API requests
		apiRequest(GEONAMES_URL, {city: destination})
		.then(data => {
			// test if geonames responded something
			if(Object.keys(data).length !== 0) {
				const {lat, lng, countryName} = data;
				apiRequest(WEATHERBIT_URL, {lat, lng, date})
				.then(data => {
					const {snow, max_temp, temp, min_temp, precip} = data;
					apiRequest(PIXABAY_URL, {city: destination})
					.then(data => {
						const {img} = data;
						// delete form from the page
						dest_element.parentElement.remove();
						// create tag with scheduled trip
						Client.showTrip({destination, date, snow, max_temp, temp, min_temp, precip, img});
					});
				});
			}
			// if city was not found
			else {
				dest_element.parentElement.style.border = '2px solid red';
			}
		});
	}
	// at least one of those fields are empty
	else {
		if(destination === "") {
			dest_element.style.border = '2px solid red';
		}
		if(date === "") {
			date_element.style.border = '2px solid red';
		}
	}
}

export {
	handleSubmit
}