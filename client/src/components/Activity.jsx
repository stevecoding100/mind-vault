import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
const Activity = () => {
    const ideas = [
        {
            title: "AI Automation",
            description: "Lorem Ipsum manie james jiole",
            category: "In Progress",
        },
        {
            title: "AI Automation",
            description: "Lorem Ipsum manie james jiole",
            category: "Complete",
        },
        {
            title: "AI Automation",
            description: "Lorem Ipsum manie james jiole",
            category: "Complete",
        },
        {
            title: "AI Automation",
            description: "Lorem Ipsum manie james jiole",
            category: "In Progress",
        },
    ];
    // Filter ideas to include only those with category "complete"
    const completedIdeas = ideas.filter((idea) => idea.category === "Complete");
    return (
        <div className=" h-full p-2 border-l-2  border-slate-300 bg-slate-100 shadow-md">
            <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-6 p-2">
                Completed Ideas
            </h3>
            {completedIdeas.map((idea) => (
                <div
                    key={idea.key}
                    className="flex justify-between items-center py-3 px-3 w-full bg-blue-100 border-b-2 border-slate-300 mb-4 rounded-md shadow-sm"
                >
                    <h5 className="font-semibold text-slate-700">
                        {idea.title}
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
    );
};

export default Activity;
