const API = "http://localhost:5000/api/auth";

const authService = {
  getCurrentUser: async (token) => {
    const res = await fetch(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  },
};

export default authService;
