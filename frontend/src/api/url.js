import axios from "axios"

const BACKEND_URL = axios.create({
    baseURL: "https://notekeeper-mern.onrender.com/api/v1/noteapp",

});

export default BACKEND_URL;