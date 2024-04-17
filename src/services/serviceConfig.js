import axios from "axios"

const api = axios.create({
    baseURL:"https://faint-heartbreaking-animal.glitch.me/api"
})

export default api