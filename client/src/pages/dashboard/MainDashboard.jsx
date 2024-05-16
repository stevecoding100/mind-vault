import SideMenu from "../../components/sidemenu/SideMenu";
import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";
import CreatingIdeaModal from "../../components/creatingIdeaModal/CreatingIdeaModal";
import { useDisclosure } from "@nextui-org/react";
import NavBar from "../../components/navBar/NavBar";
import DashboardTable from "../../components/table/DashBoardTable";
import MobileMenuBar from "../../components/sidemenu/MobileMenuBar";
import AIChat from "../../components/aiChat/AIChat";

const MainDashboard = () => {
    const [ideas, setIdeas] = useState([]);
    const [loadingIdeas, setLoadingIdeas] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [inProgressIdeas, setInProgressIdeas] = useState(null);
    const [displayAllIdeas, setDisplayAllIdeas] = useState(true);
    const [displayAll, setDisplayAll] = useState(true);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [name, setName] = useState(localStorage.getItem("name"));
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [showAiChat, setShowAiChat] = useState(false);

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

    const filterIdeas = (query) => {
        const filtered = ideas.filter((idea) =>
            idea.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredIdeas(filtered);
    };

    const toggleIdeas = () => {
        // Check if displayAllIdeas is true
        if (displayAllIdeas) {
            // Filter ideas that are in progress
            const filteredInProgressIdeas = ideas.filter(
                (idea) => idea.category === "In Progress"
            );
            // Set inProgressIdeas state with filtered ideas
            setInProgressIdeas(filteredInProgressIdeas);
        } else {
            // If displayAllIdeas is false, set inProgressIdeas state back to all ideas
            setInProgressIdeas(null);
        }
        // Toggle the displayAllIdeas state
        setDisplayAllIdeas(!displayAllIdeas);
    };

    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <div className="w-full min-h-screen relative">
            <NavBar name={name} userName={userName} />
            <div className="flex w-full max-h-screen">
                <SideMenu onOpen={onOpen} />
                {showAiChat && <AIChat />}
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
                    onOpen={onOpen}
                    toggleIdeas={toggleIdeas}
                />
            </div>
            {/* Small Screens */}
            <MobileMenuBar
                onOpen={onOpen}
                toggleIdeas={toggleIdeas}
                // handleDisplayAllIdeas={handleDisplayAllIdeas}
                // handleDisplayInProgressIdeas={handleDisplayInProgressIdeas}
                // toggleAiChat={toggleAiChat}
            />
        </div>
    );
};

export default MainDashboard;
