import axios from 'axios';

const reservation = axios.create({
	baseURL: "http://tiffany3123.pythonanywhere.com/reservation/",
})

export default reservation; 