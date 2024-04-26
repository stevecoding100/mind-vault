import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";
import CreatingIdeaModal from "../../components/CreatingIdeaModal";
import { useDisclosure } from "@nextui-org/react";
import SearchInput from "../../components/SearchInput";
const MainDashboard = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [inProgressIdeas, setInProgressIdeas] = useState(null);
    const [displayAllIdeas, setDisplayAllIdeas] = useState(true);

    // Getting all ideas
    const fetchIdeas = async () => {
        try {
            const userIdeas = await ideaAPI.idea.getAllIdeas();
            setIdeas(userIdeas.data);
            console.log(userIdeas.data);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    // Creating an Idea
    const handleCreateIdea = async (newIdea) => {
        try {
            // Create the new idea
            const createdIdea = await ideaAPI.idea.createIdea(
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

    // Toggle search input visibility
    const toggleSearchInput = () => {
        setSearchVisible(!searchVisible);
    };

    // Display on "In Porgress" Ideas
    const showInProgressIdeas = () => {
        const filteredIdeas = ideas.filter(
            (idea) => idea.category === "In Progress"
        );
        setInProgressIdeas(filteredIdeas);
    };

    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <div className="flex bg-blue-100">
            <SideMenu
                onOpen={onOpen}
                toggleSearchInput={toggleSearchInput}
                showInProgressIdeas={showInProgressIdeas}
                setDisplayAllIdeas={setDisplayAllIdeas}
            />
            <div className="flex flex-col w-full">
                {searchVisible && <SearchInput />}
                <CreatingIdeaModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onCreateIdea={handleCreateIdea}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    selectedIdea={selectedIdea}
                />
                <Header
                    ideaData={ideas}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
                    onOpenChange={onOpenChange}
                    handleDelete={handleDelete}
                    inProgressIdeas={inProgressIdeas}
                    displayAllIdeas={displayAllIdeas}
                />
            </div>
            <div className="w-[430px]">
                <Activity
                    ideaData={ideas}
                    onOpenChange={onOpenChange}
                    setSelectedIdea={setSelectedIdea}
                />
            </div>
        </div>
    );
};

export default MainDashboard;
