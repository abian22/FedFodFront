import axios from "axios"

const api = axios.create({
    baseURL:"https://feedfood.onrender.com/api/"
})

export default api