import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const ecomAPI = {
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
                return error;
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
    },
};

export default ecomAPI;
