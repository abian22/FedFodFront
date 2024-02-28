import api from "./serviceConfig"
import { redirect } from "react-router";

async function login(loginData) {
    const response = await api.post("/user/login", loginData)
    return response
}

 async function signUp(signUpData) {
    try {
      const response = await api.post("/user/signUp", signUpData);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error in signUp service:", error);
      throw error; 
    }
  }

   async function logout() {
    localStorage.removeItem('token')
    redirect('/')
  }

  export {
    login,
    signUp,
    logout
  }