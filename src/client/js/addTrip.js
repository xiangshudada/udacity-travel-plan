/*
Function that creates the form with following structure:

<div class="content-input">
	<h3>Destination:</h3>
	<input id="destination" type="text" placeholder="Paris, France">
	<h3>Date</h3>
	<input id="date" type="date">
	<button>Schedule Trip</button>
</div>

The button has a event listener for the handleSubmit function
*/
function formCreation() {
	const div = document.createElement('div');
	div.setAttribute('class', 'content-input');
	const dest_label = document.createElement('h3');
	dest_label.innerHTML = "Destination: ";
	div.append(dest_label);
	const dest_input = document.createElement('input');
	dest_input.setAttribute('id', 'destination');
	dest_input.setAttribute('type', 'text');
	dest_input.setAttribute('placeholder', 'City Name');
	div.append(dest_input);

	const date_label = document.createElement('h3');
	date_label.innerHTML = "Date: ";
	div.append(date_label);
	const date_input = document.createElement('input');
	date_input.setAttribute('id', 'date');
	date_input.setAttribute('type', 'date');
	div.append(date_input);
	const button = document.createElement('button');
	button.innerHTML = 'Add Trip';
	button.addEventListener('click', Client.handleSubmit);
	div.append(button);
	return div;
}

// event that creates form to be added to the DOM
function showForm(event) {
	event.preventDefault();
	const form = formCreation();
	document.querySelector('.content-container').prepend(form);
}

/*
Function that creates the form with following structure:

<div class="content-trip">
	<img src="" alt="City Image">
	<div>
		<h3>Departing: Date</h3>
		<h3>Trip to: City</h3>
		<h1>Typical weather for then this time of year:</p>
		<p>High: Max_Temp   Avg: Temp   Low: Min_Temp</p>
		<p>Precipitation: Precip     Snow: Snow</p>
		<button>Remove Trip</button>
	</div>
</div>

The button has a event listener for the deleteTrip function
*/
function tripCreation(trip_data) {
	const div = document.createElement('div');
	div.setAttribute('class', 'content-trip');
	const img = document.createElement('img');
	img.setAttribute('src', trip_data.img);
	img.setAttribute('alt', 'City Image');
	div.append(img);
	const aux_div = document.createElement('div');
	const city = document.createElement('h3');
	city.innerHTML = `Trip to ${trip_data.destination}`;
	aux_div.append(city);
	const date = document.createElement('h2');
	date.innerHTML = `Departing: ${trip_data.date.replace(/-/g, '/')}`;
	aux_div.append(date);
	const info = document.createElement('h1');
	info.innerHTML = "Typical weather for then:";
	aux_div.append(info);
	const temp = document.createElement('p');
	temp.innerHTML = `High: ${trip_data.max_temp}  Avg: ${trip_data.temp}  Low: ${trip_data.min_temp}`;
	aux_div.append(temp);
	const precip = document.createElement('p');
	precip.innerHTML = `Precipitation: ${trip_data.precip}   Snow: ${trip_data.snow}`;
	aux_div.append(precip);
	const button = document.createElement('button');
	button.innerHTML = 'Remove Trip';
	button.addEventListener('click', Client.deleteTrip);
	aux_div.append(button);
	div.append(aux_div);
	return div;
}

// function that creates the schedule trip to be added to the DOM
function showTrip(trip_data) {
	const div = tripCreation(trip_data);
	document.querySelector('.content-container').append(div)
}

// function that deletes trip entry from the DOM
function deleteTrip(event) {
	event.preventDefault();
	event.target.parentElement.parentElement.remove();
}

export {
	showForm,
	showTrip,
	deleteTrip
}

