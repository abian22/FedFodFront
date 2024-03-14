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
    const result = await api.get('/media', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    // console.log('result from service', result.data);
    return result;
  } catch (error) {
    console.error('Error with getRandomMedia function', error);
  }
}

async function postMedia(file, description) {
  const formData = new FormData();
    formData.append("media", file);
    formData.append("description", description);
    
  try {
    const result = await api.post('/media', formData, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    return result.data
  } catch (error) {
    console.error('Error with postMedia function', error);
  }
}

async function getMyMedia() {
  try {
    const result = await api.get('/media/me', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    // console.log('result from service', result.data);
    return result.data;
  } catch (error) {
    console.error('Error with getRandomMedia function', error);
  }
}


async function updateMyMedia(mediaId) {
  try {
    const result = await api.put(`/media/me/${mediaId}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    return result.data;
  } catch (error) {
    console.error('Error with updateMyMedia function', error);
  }
}



export { uploadProfileImg, getAllMedias, postMedia, getMyMedia, updateMyMedia};
