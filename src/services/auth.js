import { Redirect } from 'react-router-dom';

import api from "./serviceConfig"

export async function login(loginData) {
    const response = await api.post("/user/login", loginData)
    return response
}

export async function signUp(signUpData) {
    const response = await api.post("/user/signUp", signUpData)
    return response
}

export async function logout() {
    localStorage.removeItem("token")
    return <Redirect to="/" />;
}