import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";
import CreatingIdeaModal from "../../components/creatingIdeaModal/CreatingIdeaModal";
import DashboardTable from "../../components/table/DashBoardTable";
import MobileMenuBar from "../../components/sidemenu/MobileMenuBar";
// import SettingsMenu from "../../components/sidemenu/SettingsMenu";

const MainDashboard = ({
    isOpen,
    onOpen,
    onOpenChange,
    filterIdeas,
    setIdeas,
    ideas,
    handleDisplayAllIdeas,
    handleDisplayInProgressIdeas,
    toggleAiChat,
    inProgressIdeas,
    displayAllIdeas,
    displayAll,
    filteredIdeas,
}) => {
    const [loadingIdeas, setLoadingIdeas] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    // Getting all ideas
    const fetchIdeas = async (userId) => {
        try {
            const userIdeas = await ideaAPI.idea.getAllIdeas(userId);
            setIdeas(userIdeas);
            setLoadingIdeas(false);
        } catch (error) {
            setError(error.message);
            setLoadingIdeas(false);
        }
    };

    useEffect(() => {
        fetchIdeas(userId);
    }, []);
    // Creating an Idea
    const handleCreateIdea = async (newIdea) => {
        try {
            // Create the new idea
            const createdIdea = await ideaAPI.idea.createIdea(
                userId,
                newIdea.title,
                newIdea.description,
                newIdea.category
            );

            // Add the newly created idea to the state
            setIdeas([createdIdea.data, ...ideas]);

            // // Close the modal
            onOpenChange(false);
        } catch (error) {
            setError(error.message);
        }
    };
    // Editing an Idea
    const handleEdit = async (ideaId, updatedIdea) => {
        try {
            const updatedIdeaData = await ideaAPI.idea.updateIdea(
                ideaId,
                updatedIdea
            );
            // Find the index of the edited idea in the ideas array
            const editedIdeaIndex = ideas.findIndex(
                (idea) => idea.idea_id === ideaId
            );

            // Create a new array with the updated idea replacing the old one
            const updatedIdeas = [...ideas];
            updatedIdeas[editedIdeaIndex] = updatedIdeaData.data;

            // Remove the edited idea from its current position
            updatedIdeas.splice(editedIdeaIndex, 1);

            // Prepend the updated idea to the existing list of ideas
            setIdeas([updatedIdeaData.data, ...updatedIdeas]);
        } catch (error) {
            setError("Error updating idea");
        }
    };

    // Deleting an Idea
    const handleDelete = async (ideaId) => {
        try {
            await ideaAPI.idea.deleteIdea(ideaId);
            // After successfully deleting the idea, filter out the deleted idea from the state
            setIdeas(ideas.filter((idea) => idea.idea_id !== ideaId));
        } catch (error) {
            setError("Erro deleting idea");
        }
    };

    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <div className=" w-full lg:min-w-[1200px]  min-h-screen">
            <div className="flex w-full max-h-screen">
                <CreatingIdeaModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onCreateIdea={handleCreateIdea}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    selectedIdea={selectedIdea}
                />
                <DashboardTable
                    ideaData={ideas}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
                    onOpenChange={onOpenChange}
                    handleDelete={handleDelete}
                    inProgressIdeas={inProgressIdeas}
                    displayAllIdeas={displayAllIdeas}
                    filterIdeas={filterIdeas}
                    filteredIdeas={filteredIdeas}
                    name={name}
                />
            </div>
        </div>
    );
};

export default MainDashboard;
