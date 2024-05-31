import axios from "axios";
import Cookies from "js-cookie";
const baseURL = import.meta.env.VITE_PRODUCTION_API_URL;

const authAPI = {
    //AUTH
    auth: {
        login: async (formData) => {
            try {
                const response = await axios.post(
                    `${baseURL}/auth/users/login`,
                    formData
                );
                return response;
            } catch (error) {
                throw new Error("Login failed. Please check your credentials.");
            }
        },
        register: async (formData) => {
            try {
                const response = await axios.post(
                    `${baseURL}/auth/users/signup`,
                    formData
                );
                return response;
            } catch (error) {
                throw new Error("Registration failed. Please try again.");
            }
        },
        getUserInfo: async (userId) => {
            try {
                const token = Cookies.get("token");
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
