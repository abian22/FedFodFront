import axios from "axios"

const api = axios.create({
    baseURL:"https://ttk-back2-git-main-abian22s-projects.vercel.app/api"
})

export default api