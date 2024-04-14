import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
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
        createIdea: async () => {
            try {
                const createIdeas = await axios.post(
                    `${baseURL}/ideas/:${userId}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                return createIdeas;
            } catch (error) {
                throw new Error("Error creating idea", error);
            }
        },
        updateIdea: async (ideaId) => {
            try {
                const createIdeas = await axios.put(
                    `${baseURL}/ideas/:${ideaId}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                return createIdeas;
            } catch (error) {
                throw new Error("Error updating idea", error);
            }
        },
        getIdeaById: async (ideaId) => {
            try {
                const createIdeas = await axios.get(
                    `${baseURL}/ideas/:${ideaId}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                return createIdeas;
            } catch (error) {
                throw new Error("Error getting idea", error);
            }
        },
        deleteIdea: async (ideaId) => {
            try {
                const createIdeas = await axios.delete(
                    `${baseURL}/ideas/:${ideaId}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                return createIdeas;
            } catch (error) {
                throw new Error("Error deleting idea", error);
            }
        },
    },
};
export default ideaAPI;
