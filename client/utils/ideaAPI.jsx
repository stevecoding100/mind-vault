import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const ideaAPI = {
    idea: {
        getIdeas: async () => {
            try {
                const products = await axios.get(`${baseURL}/products`);
                return products;
            } catch (error) {
                throw new Error("Error getting products", error);
            }
        },
    },
};
