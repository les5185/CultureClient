import axios from 'axios';

const social = axios.create({
	baseURL: "http://tiffany3123.pythonanywhere.com/user/",
	headers: {
		Authorization: `JWT ${localStorage.getItem('token')}`,
	}
})

export default social; 