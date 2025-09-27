import axios from "axios";

const baseURL = "https://pin-backend-1.onrender.com"

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})

export default Axios