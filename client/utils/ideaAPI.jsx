import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const ideaAPI = {
    idea: {
        getAllIdeas: async (userId) => {
            try {
                const response = await axios.get(`${baseURL}/ideas/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });

                return response.data;
            } catch (error) {
                if (error.response) {
                    // No ideas found, return empty array
                    return [];
                }
                console.error("Error getting ideas from API:", error);
                throw new Error("Error getting ideas from API");
            }
        },
        createIdea: async (userId, title, description, category) => {
            try {
                const createIdeas = await axios.post(
                    `${baseURL}/ideas/${userId}`,
                    { title, description, category },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log("Line 32: ", createIdeas);
                return createIdeas;
            } catch (error) {
                throw new Error("Error creating idea", error);
            }
        },
        updateIdea: async (ideaId, updateData) => {
            try {
                const updateIdeas = await axios.put(
                    `${baseURL}/ideas/${ideaId}`,
                    updateData,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                return updateIdeas;
            } catch (error) {
                throw new Error("Error updating idea", error);
            }
        },
        getIdeaById: async (ideaId) => {
            try {
                const idea = await axios.get(`${baseURL}/ideas/${ideaId}`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                return idea;
            } catch (error) {
                throw new Error("Error getting idea by Id", error);
            }
        },
        deleteIdea: async (ideaId) => {
            try {
                const deleteIdeas = await axios.delete(
                    `${baseURL}/ideas/${ideaId}`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                return deleteIdeas;
            } catch (error) {
                throw new Error("Error deleting idea", error);
            }
        },
    },
};
export default ideaAPI;
