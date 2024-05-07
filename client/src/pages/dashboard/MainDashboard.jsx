import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";
import CreatingIdeaModal from "../../components/CreatingIdeaModal";
import { useDisclosure } from "@nextui-org/react";
import SearchInput from "../../components/SearchInput";
import MenuBar from "../../components/smallScreens/MenuBar";
import MobileActivity from "../../components/smallScreens/MobileActivity";
import AIChat from "../../components/AIChat";

const MainDashboard = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [inProgressIdeas, setInProgressIdeas] = useState(null);
    const [displayAllIdeas, setDisplayAllIdeas] = useState(true);
    const [displayAll, setDisplayAll] = useState(true);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    );
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
    const [showRecent, setShowRecent] = useState(false);
    const [showAiChat, setShowAiChat] = useState(false);

    // Getting all ideas
    const fetchIdeas = async () => {
        try {
            const userIdeas = await ideaAPI.idea.getAllIdeas(userId);
            if (!userIdeas) {
                setIdeas([]);
            }
            setIdeas(userIdeas);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, [userId]);

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

    const filterIdeas = (query) => {
        const filtered = ideas.filter((idea) =>
            idea.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredIdeas(filtered);
    };

    const handleDisplayAllIdeas = () => {
        setDisplayAll(true);
        setDisplayAllIdeas(true);
    };

    const handleDisplayInProgressIdeas = () => {
        setDisplayAll(false);
        setDisplayAllIdeas(false);
        showInProgressIdeas();
    };

    // Handle Recent button click
    const handleRecentClick = () => {
        setShowRecent(true);
    };

    // Handle Home button click
    const handleHomeClick = () => {
        setShowRecent(false);
    };
    // Toggle AI Chat
    const toggleAiChat = () => {
        setShowAiChat((prevState) => !prevState);
    };
    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <>
            <div className=" md:flex justify-between  bg-blue-100">
                {showAiChat && <AIChat />}
                <SideMenu
                    onOpen={onOpen}
                    toggleSearchInput={toggleSearchInput}
                    name={name}
                    userName={userName}
                    handleDisplayAllIdeas={handleDisplayAllIdeas}
                    handleDisplayInProgressIdeas={handleDisplayInProgressIdeas}
                    toggleAiChat={toggleAiChat}
                />

                <div className="flex flex-col min-h-screen w-full md:w-[1280px]  md:block">
                    <CreatingIdeaModal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        onCreateIdea={handleCreateIdea}
                        fetchIdeas={fetchIdeas}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        selectedIdea={selectedIdea}
                    />
                    {showRecent ? (
                        <MobileActivity
                            ideaData={ideas}
                            onOpenChange={onOpenChange}
                            setSelectedIdea={setSelectedIdea}
                        />
                    ) : (
                        <Header
                            ideaData={ideas}
                            fetchIdeas={fetchIdeas}
                            handleEdit={handleEdit}
                            onOpenChange={onOpenChange}
                            handleDelete={handleDelete}
                            inProgressIdeas={inProgressIdeas}
                            displayAllIdeas={displayAllIdeas}
                            searchVisible={searchVisible}
                            filterIdeas={filterIdeas}
                            filteredIdeas={filteredIdeas}
                            name={name}
                            toggleSearchInput={toggleSearchInput}
                        />
                    )}
                </div>

                <div className="w-[400px] hidden md:block">
                    <Activity
                        ideaData={ideas}
                        onOpenChange={onOpenChange}
                        setSelectedIdea={setSelectedIdea}
                    />
                </div>
            </div>
            <div className="absolute md:hidden w-full">
                <MenuBar
                    onOpen={onOpen}
                    handleDisplayAllIdeas={handleDisplayAllIdeas}
                    handleDisplayInProgressIdeas={handleDisplayInProgressIdeas}
                    toggleSearchInput={toggleSearchInput}
                    handleRecentClick={handleRecentClick}
                    handleHomeClick={handleHomeClick}
                    toggleAiChat={toggleAiChat}
                    setShowAiChat={setShowAiChat}
                />
            </div>
        </>
    );
};

export default MainDashboard;
