import api from "./serviceConfig"

export default async function uploadProfileImg(file) {
    try {
      const formData = new FormData();
      formData.append('media', file);
  
      const result = await api.post('/media/profileImg', formData, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      });
      console.log("uploadProfileImg result:", result);
      return result.data;
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  }
  