import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const MobileActivity = ({ ideaData, onOpenChange, setSelectedIdea }) => {
    const truncateDescription = (description) => {
        if (description.length > 15) {
            return description.substring(0, 15) + "...";
        }
        return description;
    };

    // Add a click handler to each idea item
    const handleIdeaClick = (idea) => {
        setSelectedIdea(idea); // Set the selected idea in state
        onOpenChange(true); // Open the modal
    };

    // Filter ideas to include only those with category "complete"
    const completedIdeas = ideaData.filter(
        (idea) => idea.category === "Complete"
    );
    return (
        <div>
            <div className=" min-h-screen w-full border-l-2  border-slate-300 bg-slate-100 shadow-md p-3">
                <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-6 p-2">
                    Completed Ideas
                </h3>
                {completedIdeas.map((idea) => (
                    <div
                        key={idea.key}
                        className="flex justify-between items-center py-8 px-6 w-full bg-blue-100 border-b-2 border-slate-300 mb-4 rounded-md shadow-sm"
                        onClick={() => handleIdeaClick(idea)}
                    >
                        <h5 className="font-semibold text-slate-700">
                            {truncateDescription(idea.title)}
                        </h5>

                        <AiOutlineCheckCircle
                            className="text-green-700"
                            fontSize={18}
                        />
                        <BsThreeDotsVertical
                            fontSize={18}
                            className="text-slate-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileActivity;
