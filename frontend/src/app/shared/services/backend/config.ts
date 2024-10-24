import axios from "axios"

export const db = () => {
	return axios.create({
	baseURL: process.env.DB_URL || 'http://localhost:8000',
	headers: {
			accept: 'application/json'
		}
	});
};