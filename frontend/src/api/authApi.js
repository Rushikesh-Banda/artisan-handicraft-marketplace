import axios from "axios";

const API =
  "http://localhost:5002/api/auth";


// ==============================
// LOGIN
// ==============================

export const login =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/login`,
        userData
      );

    // Backend returns: { success, user: { _id, name, email, role, token } }
    return response.data;
};


// ==============================
// REGISTER
// ==============================

export const register =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/register`,
        userData
      );

    // Backend returns: { success, user: { _id, name, email, role, token } }
    return response.data;
};


// ==============================
// LOGOUT
// ==============================

export const logout =
  async () => {

    localStorage.removeItem("user");
};

// ==============================
// RESET PASSWORD
// ==============================

export const resetPassword =
  async (email, password) => {

    const response =
      await axios.put(

        `${API}/reset-password`,

        {
          email,
          password,
        }
      );

    return response.data;
};