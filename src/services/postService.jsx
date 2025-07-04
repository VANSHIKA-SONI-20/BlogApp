const API_URL = "http://localhost:5000/api/posts";

const postService = {
  createPost: async (data, token) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data, // FormData
    });
    return await res.json();
  },

  updatePost: async (id, data, token) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data, // FormData
    });
    return await res.json();
  },
};

export default postService;
