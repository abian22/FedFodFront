import axios from "axios"

const api = axios.create({
    baseURL:"https://appetitcomite.onrender.com/api"
})

export default api