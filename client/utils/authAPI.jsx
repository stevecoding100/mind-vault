import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const ecomAPI = {
    //AUTH
    auth: {
        register: async (formData) => {
            try {
                const user = await axios.post(
                    `${baseURL}/auth/users/signup`,
                    formData
                );
                localStorage.setItem("token", user.token);
                localStorage.setItem("userID", user.userId);
                return user;
            } catch (error) {
                return error;
            }
        },
        login: async (formData) => {
            try {
                const user = await axios.post(
                    `${baseURL}/auth/users/login`,
                    formData
                );
                localStorage.setItem("token", user.data.token);
                localStorage.setItem("userID", user.data.userId);
                return user;
            } catch (error) {
                return error;
            }
        },
    },
};

export default ecomAPI;
