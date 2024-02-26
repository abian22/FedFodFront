import api from "./serviceConfig"

 async function login(loginData) {
    const response = await api.post("user/login", loginData)
    return response
}

 async function signUp(signUpData) {
    try {
      const response = await api.post("user/signUp", signUpData);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error in signUp service:", error);
      throw error; 
    }
  }

  export {
    login,
    signUp
  }