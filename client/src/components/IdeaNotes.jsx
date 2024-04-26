import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import ideaAPI from "../../utils/ideaAPI";
import CreatingIdeaModal from "../components/CreatingIdeaModal";

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
    const ideasToDisplay = searchQuery.length > 0 ? filteredIdeas : ideasToMap;
    return (
        <div className="w-full h-[85vh] overflow-y-scroll p-2">
            <h3 className="text-xl font-semibold text-slate-600 mb-4 ml-2">
                My Ideas
            </h3>

            {searchVisible && (
                <SearchInput
                    value={searchQuery}
                    handleSearchChange={handleSearchChange}
                />
            )}
            {ideasToDisplay.map((idea) => (
                <div
                    key={idea.key}
                    className="flex w-full  shadow-md justify-between items-center bg-slate-100 mb-4 text-slate-900 rounded-md py-4 px-4 overflow-x-scroll"
                >
                    <Link to="#">
                        <h5 className="text-md mb-2 w-[400px] font-bold text-lg text-slate-800">
                            {idea.title}
                        </h5>
                        <p className="text-md text-slate-600">
                            {truncateDescription(idea.description)}
                        </p>
                    </Link>
                    <p
                        className={`font-semibold text-center w-[150px] ${
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
