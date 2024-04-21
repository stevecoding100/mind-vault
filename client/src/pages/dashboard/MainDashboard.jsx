import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";
import CreatingIdeaModal from "../../components/CreatingIdeaModal";
import { useDisclosure } from "@nextui-org/react";
const MainDashboard = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedIdea, setSelectedIdea] = useState(null);

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

            // Close the modal
            onOpenChange(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = async (ideaId, updatedIdea) => {
        try {
            await ideaAPI.idea.updateIdea(ideaId, updatedIdea);
            fetchIdeas(); // Fetch the updated list of ideas
            onOpenChange(false); // Close the modal
        } catch (error) {
            setError("Error updating idea");
        }
    };

    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <div className="flex bg-blue-100">
            <SideMenu onOpen={onOpen} />
            <div className="flex flex-col w-full">
                <CreatingIdeaModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onCreateIdea={handleCreateIdea}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
                    selectedIdea={selectedIdea}
                />
                <Header
                    ideaData={ideas}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
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
