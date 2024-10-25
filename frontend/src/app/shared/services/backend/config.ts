import axios from "axios"
import { LOCAL_STORAGE_KEY__ACCESS_TOKEN } from "../../context";

export const db = () => {
	return axios.create({
	baseURL: process.env.DB_URL || 'http://localhost:8000',
	headers: {
			accept: 'application/json',
			Authorization: `Bearer ${(localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)?.slice(1, -1) || "")}`
		}
	});
}