import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
const IdeaNotes = () => {
    const truncateDescription = (description) => {
        if (description.length > 30) {
            return description.substring(0, 30) + "...";
        }
        return description;
    };
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

    return (
        <div className="w-full h-[85vh] overflow-y-scroll">
            <h3 className="text-xl font-semibold text-slate-600 mb-4 ml-2">
                My Ideas
            </h3>
            {ideas.map((idea) => (
                <div
                    key={idea.key}
                    className="flex w-full  shadow-md justify-between items-center bg-slate-100 mb-4 text-slate-900 rounded-md py-4 px-4 overflow-x-scroll"
                >
                    <Link to="#">
                        <h5 className="text-md mb-2 font-bold text-lg text-slate-800">
                            {idea.title}
                        </h5>
                        <p className="text-md text-slate-600">
                            {truncateDescription(idea.description)}
                        </p>
                    </Link>
                    <p
                        className={`font-semibold text-center  ${
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
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default IdeaNotes;
