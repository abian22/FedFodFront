import api from "./serviceConfig";

async function getProfile() {
  const result = await api.get("/user/me", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  console.log(result);
  return result.data;
}

async function updateProfile(profileData) {
  const result = await api.put("/user/me", profileData, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return result.data;
}

async function deleteMyAccount() {
  const result = await api.delete("/user/me", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return result.data;
}

async function getUserInfo(userId) {
  try {
    const result = await api.get(`/user/${userId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data.user;
  } catch (error) {
    throw new Error("Error fetching user information: " + error.message);
  }
}

async function searchUser(username) {
  try {
    const result = await api.post(
      `/user/search`,
      {
        username: username,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw new Error("Error fetching user information: " + error.message);
  }
}



export { getProfile, updateProfile, deleteMyAccount, getUserInfo, searchUser };
