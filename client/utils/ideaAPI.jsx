import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const ideaAPI = {
    idea: {
        getAllIdeas: async () => {
            try {
                const ideas = await axios.get(`${baseURL}/ideas`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                return ideas;
            } catch (error) {
                throw new Error("Error getting ideas", error);
            }
        },
    },
};
export default ideaAPI;
