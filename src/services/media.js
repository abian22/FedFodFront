import api from "./serviceConfig";

async function uploadProfileImg(file) {
  try {
    const formData = new FormData();
    formData.append("media", file);

    const result = await api.post("/media/profileImg", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log("uploadProfileImg result:", result);
    return result.data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
  }
}

async function getAllMedias() {
  try {
    const result = await api.get("/media", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result;
  } catch (error) {
    console.error("Error with getRandomMedia function", error);
  }
}

async function postMedia(file, description) {
  const formData = new FormData();
  formData.append("media", file);
  formData.append("description", description);

  try {
    const result = await api.post("/media", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error with postMedia function", error);
  }
}

async function getMyMedia() {
  try {
    const result = await api.get("/media/me", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error with getRandomMedia function", error);
  }
}

async function updateMyMedia(mediaId, newDescription) {
  try {
    const result = await api.put(
      `/media/me/${mediaId}`,
      {
        description: newDescription,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error with updateMyMedia function", error);
    throw error;
  }
}
async function myLike(mediaId) {
  try {
    const response = await api.post(`/media/${mediaId}/like`, null, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al toggle likes:", error);
    throw error;
  }
}

async function userMedia(mediaId) {
  try {
    const result = await api.get(`/media/user/${mediaId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching user information: " + error.message);
  }
}

async function getSingleMedia(mediaId) {
  try {
    const result = await api.get(`/media/${mediaId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching user information: " + error.message);
  }
}

async function deleteMyMedia(mediaId) {
  try {
    const result = await api.delete(`/media/me/${mediaId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching user information: " + error.message);
  }
}

export {
  uploadProfileImg,
  getAllMedias,
  postMedia,
  getMyMedia,
  updateMyMedia,
  myLike,
  userMedia,
  getSingleMedia,
  deleteMyMedia,
};
