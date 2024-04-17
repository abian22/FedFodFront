import axios from "axios"

const api = axios.create({
    baseURL:"https://ttk-back2.vercel.app/api"
})

export default api