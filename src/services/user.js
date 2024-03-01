import api from "./serviceConfig"

export async function getProfile() {
    const result = await api.get('/user/me',
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        console.log(result)
    return result.data
}

