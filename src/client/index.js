// Sass imports
import './styles/base.scss';
import './styles/header.scss';
import './styles/menu.scss';
import './styles/content.scss';
import './styles/footer.scss';

// JavaScript code
import {showForm, showTrip, deleteTrip} from './js/addTrip';
import {handleSubmit} from './js/formHandler';
import {notEmptyInput} from './js/inputValidator';

const addButton = document.querySelector('.add-trip');
addButton.addEventListener('click', showForm);

export {
	showForm,
	showTrip,
	deleteTrip,
	handleSubmit,
	notEmptyInput
}