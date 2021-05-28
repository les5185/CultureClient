
import axios from 'axios';

const content2 = axios.create({
	baseURL: "http://tiffany3123.pythonanywhere.com/contents/",
	headers: {
		Authorization: `JWT ${localStorage.getItem('token')}`,
	}
})

export default content2; 