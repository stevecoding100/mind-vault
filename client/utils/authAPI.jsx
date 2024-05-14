import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const authAPI = {
    //AUTH
    auth: {
        login: async (formData) => {
            try {
                const user = await axios.post(
                    `${baseURL}/auth/users/login`,
                    formData
                );
                localStorage.setItem("token", user.data.token);
                localStorage.setItem("userId", user.data.userId);
                localStorage.setItem("name", user.data.user.name);
                localStorage.setItem("userName", user.data.user.username);
                return user;
            } catch (error) {
                throw new Error("Login failed. Please check your credentials.");
            }
        },
        register: async (formData) => {
            try {
                const user = await axios.post(
                    `${baseURL}/auth/users/signup`,
                    formData
                );
                localStorage.setItem("token", user.data.token);
                localStorage.setItem("userId", user.data.userId);
                localStorage.setItem("name", user.data.name);
                localStorage.setItem("userName", user.data.username);

                return user;
            } catch (error) {
                return error;
            }
        },
        getUserInfo: async (userId) => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    // Handle case where token is not found
                    throw new Error("Token not found");
                }

                // Make GET request to fetch user info
                const response = await axios.get(
                    `${baseURL}/auth/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Return user data
                return response.data;
            } catch (error) {
                // Handle errors
                console.error("Error fetching user info:", error);
                throw error;
            }
        },
    },
};

export default authAPI;
