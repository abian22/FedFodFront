import api from "./serviceConfig"

 async function getProfile() {
    const result = await api.get('/user/me',
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        console.log(result)
    return result.data
}

async function updateProfile(profileData) {
    const result = await api.put('/user/me', profileData,
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
    return result.data
}

async function deleteMyAccount() {
    const result = await api.delete('/user/me',
    {
        headers: {
            token: localStorage.getItem('token')
        }
    })
return result.data

}

export {
    getProfile,
    updateProfile,
    deleteMyAccount
}

