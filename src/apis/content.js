import axios from 'axios';


const content = axios.create({
	baseURL: "http://tiffany3123.pythonanywhere.com/contents/",
})

export default content; 