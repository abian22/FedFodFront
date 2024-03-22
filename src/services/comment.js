import api from "./serviceConfig";

async function getCommentOfMedia(mediaId) {
  const result = await api.get(`/comment/${mediaId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return result.data;
}

async function postComment(mediaId, text) {
  const result = await api.post(
    `/comment/${mediaId}`,
    {
      text: text,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  return result.data;
}

async function deleteMyComment(mediaId, commentId) {
  const result = await api.delete(`/comment/${mediaId}/${commentId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return result.data;
}
async function commentLike(commentId) {
  try {
    const response = await api.post(`/comment/${commentId}/like`, null, {
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

async function getComments() {
  const result = await api.get(`/comment`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return result.data;
}

export {
  getCommentOfMedia,
  postComment,
  deleteMyComment,
  commentLike,
  getComments,
};
