import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import CreatingIdeaModal from "../creatingIdeaModal/CreatingIdeaModal";

// import MobileDashBoardTable from "./MobileDashBoardTable";
const DashBoardTable = ({
    ideaData,
    handleEdit,
    handleDelete,
    inProgressIdeas,
    displayAllIdeas,
    filterIdeas,
    filteredIdeas,
    toggleIdeas,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const truncateDescription = (description) => {
        if (description.length > 50) {
            return description.substring(0, 50) + "...";
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
    const ideasToMap = displayAllIdeas ? ideaData : inProgressIdeas;
    const ideasToDisplay = searchQuery.length > 0 ? filteredIdeas : ideasToMap; // Check if the user is logged in and has no ideas attached to their account
    const hasNoIdeas = isLoggedIn && ideaData.length === 0;
    return (
        <div className="w-full  mx-auto flex flex-col items-center md:border-l-1 md:border-t-1 rounded-sm border-[#DADCE2] p-4 md:p-10 h-[75vh] mb-16  overflow-y-scroll scroll-smooth">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search idea..."
                className="p-2 w-[360px] mt-12 mb-12 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 lg:hidden"
            />

            <div className="flex w-full px-2 md:px-0 items-center justify-between">
                <p className="text-xs md:text-sm font-medium">Ideas</p>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search idea..."
                    className="h-10 px-4 min-w-[250px] hidden lg:block rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />

                <button
                    onClick={toggleIdeas}
                    className="w-24 md:w-28  h-8 md:h-10 px-1 md:px-0 text-xs  font-bold rounded-md border-yellow-600 border-2 text-yellow-700 hover:bg-yellow-700 hover:text-white focus:outline-none"
                >
                    {displayAllIdeas ? "In Progress" : "All Ideas"}
                </button>

                <div className="flex min-w-[185px] md:min-w-[250px] xl:min-w-[400px] ml-4 justify-between lg:items-center">
                    <p className="text-xs md:text-sm font-medium ml-3 lg:ml-0">
                        Status
                    </p>
                    <p className="text-xs md:text-sm  font-medium ml-6 lg:ml-0">
                        Date
                    </p>
                    <p className="text-xs md:text-sm  font-medium">Action</p>
                </div>
            </div>
            {ideasToDisplay.map((idea) => (
                <div
                    key={idea.key}
                    className="flex justify-between mt-14 border-b-1 ml-4 border-[#EAECF0] w-full h-24 pb-4 px-2"
                >
                    {hasNoIdeas && (
                        <p className="text-center text-md md:text-xl font-bold text-slate-600 mt-20">
                            Create a new idea
                        </p>
                    )}

                    <div>
                        <h2 className="text-md md:text-lg xl:text-xl font-bold">
                            {truncateDescription(idea.title)}
                        </h2>
                        <p className=" text-xs md:text-sm xl:text-md w-[85%] mt-2">
                            {truncateDescription(idea.description)}
                        </p>
                    </div>
                    <div className="flex min-w-[185px] md:min-w-[250px] xl:min-w-[400px]   justify-between items-center lg:mr-3">
                        <p
                            className={`text-xs  md:text-sm xl:text-md font-bold ${
                                idea.category === "Complete"
                                    ? "text-green-700"
                                    : "text-yellow-700"
                            } `}
                        >
                            {idea.category}
                        </p>
                        <p className=" text-[.5rem] md:text-xs  text-[#4D5566] font-medium">
                            May 11 12:35 PM
                        </p>
                        <HiDotsVertical
                            className="text-md text-[#505970]  mr-2 lg:mr-0"
                            size={15}
                            onClick={() => handleEditIdea(idea)}
                        />
                    </div>
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

export default DashBoardTable;
