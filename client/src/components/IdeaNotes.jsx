import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import CreatingIdeaModal from "../components/CreatingIdeaModal";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import SearchInput from "./SearchInput";

const IdeaNotes = ({
    ideas,
    handleEdit,
    handleDelete,
    inProgressIdeas,
    displayAllIdeas,
    searchVisible,
    filterIdeas,
    filteredIdeas,
    isLoggedIn,
    toggleSearchInput,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const truncateDescription = (description) => {
        if (description.length > 30) {
            return description.substring(0, 30) + "...";
        }
        return description;
    };

    const handleEditIdea = (idea) => {
        setSelectedIdea(idea);
        setIsModalOpen(true);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterIdeas(query);
    };

    // Determine which set of ideas to display based on  displayAllIdeas prop
    const ideasToMap = displayAllIdeas ? ideas : inProgressIdeas;
    const ideasToDisplay = searchQuery.length > 0 ? filteredIdeas : ideasToMap; // Check if the user is logged in and has no ideas attached to their account
    const hasNoIdeas = isLoggedIn && ideas.length === 0;

    return (
        <div className="h-[85vh] w-full overflow-y-scroll md:p-2 p-4">
            <h3 className="text-md md:text-xl font-semibold text-slate-700 mb-4 ml-2">
                My Ideas
            </h3>
            {}
            <FaSearch
                onClick={toggleSearchInput}
                size={18}
                className="absolute right-12 top-[220px] text-gray-500 hover:text-gray-700 md:hidden"
            />

            {hasNoIdeas && (
                <p className="text-center text-md md:text-xl font-bold text-slate-600 mt-20">
                    Create a new idea
                </p>
            )}
            {searchVisible && (
                <SearchInput
                    value={searchQuery}
                    handleSearchChange={handleSearchChange}
                />
            )}
            {ideasToDisplay.map((idea) => (
                <div
                    key={idea.key}
                    className="flex w-full shadow-md justify-between items-center bg-white mb-4 text-slate-900 rounded-md py-4 px-4 overflow-x-scroll"
                >
                    <Link to="#">
                        <h5 className="text-md md:text-xl mb-2 w-[100px] md:w-[400px] font-bold  text-slate-800">
                            {truncateDescription(idea.title)}
                        </h5>
                        <p className=" text-sm md:text-md text-slate-600">
                            {truncateDescription(idea.description)}
                        </p>
                    </Link>
                    <p
                        className={`font-semibold text-center w-[150px] text-sm md:text-lg ${
                            idea.category === "Complete"
                                ? "text-green-700"
                                : "text-yellow-600"
                        } `}
                    >
                        {idea.category}
                    </p>
                    <Link to="#">
                        <BsThreeDotsVertical
                            fontSize={18}
                            className="text-slate-500"
                            onClick={() => handleEditIdea(idea)}
                        />
                    </Link>
                </div>
            ))}
            {isModalOpen && (
                <CreatingIdeaModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    selectedIdea={selectedIdea}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default IdeaNotes;
