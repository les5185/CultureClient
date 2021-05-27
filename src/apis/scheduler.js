import axios from 'axios';

const scheduler = axios.create({
	baseURL: "http://tiffany3123.pythonanywhere.com/schedulers/",
	headers: {
		Authorization: `JWT ${localStorage.getItem('token')}`,
	}
})

export default scheduler; 