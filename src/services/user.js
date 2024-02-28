import api from "./serviceConfig"

async function getAllUsers(loginData) {
    const response = await api.post("api/user/login", loginData)
    return response
}

export default getAllUsers