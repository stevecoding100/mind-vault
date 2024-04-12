const ideaModel = require("../models/idea");

const ideaController = {
    getAllIdeas: async (req, res) => {
        try {
            const ideas = await ideaModel.getAllIdeas();
            res.json(ideas);
        } catch (error) {
            console.error("Error fetching ideas:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createIdea: async (req, res) => {
        const { title, description, category, userId } = req.body;
        try {
            const newIdea = await ideaModel.createIdea(
                title,
                description,
                category,
                userId
            );
            res.status(201).json(newIdea);
        } catch (error) {
            console.error("Error creating idea:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateIdea: async (req, res) => {
        const { id } = req.params;
        const { title, description, category } = req.body;
        try {
            const updateIdea = await ideaModel.updateIdea(
                id,
                title,
                description,
                category
            );
            res.json(updateIdea);
        } catch (error) {
            console.error("Error updating idea:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteIdea: async (req, res) => {
        const { id } = req.params;
        try {
            await ideaModel.deleteIdea(id);
            res.json({ message: "Idea deleted successfully" });
        } catch (error) {
            console.error("Error deleting idea:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = ideaController;
