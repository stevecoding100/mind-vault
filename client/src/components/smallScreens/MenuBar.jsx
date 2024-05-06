import { FaPlusCircle } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { GrInProgress } from "react-icons/gr";
import { IoTime } from "react-icons/io5";

import { GiArtificialHive } from "react-icons/gi";
import { Link } from "react-router-dom";
const MenuBar = ({
    onOpen,
    handleDisplayAllIdeas,
    handleDisplayInProgressIdeas,
    handleRecentClick,
    handleHomeClick,
    toggleAiChat,
}) => {
    const handleDisplayAllIdeasAndHomeClick = () => {
        handleDisplayAllIdeas();
        handleHomeClick();
    };
    return (
        <div>
            {/* Menu Bar */}
            <div className="mx-auto flex bg-white items-center justify-between px-5  h-16 border-t-2  border-slate-300">
                <button
                    onClick={handleDisplayAllIdeasAndHomeClick}
                    className="flex flex-col-reverse items-center text-xs font-semibold text-slate-700 cursor-pointer"
                >
                    <BiHome size={22} className="text-slate-500 mt-2" />
                    Home
                </button>

                <button
                    onClick={handleDisplayInProgressIdeas}
                    className="flex flex-col-reverse items-center text-xs font-semibold text-slate-700 cursor-pointer"
                >
                    <GrInProgress size={22} className="text-slate-500 mt-2" />
                    In Progress
                </button>
                <button
                    onClick={onOpen}
                    className="flex flex-col-reverse items-center text-xs font-semibold text-slate-700 cursor-pointer "
                >
                    <FaPlusCircle size={28} className="text-blue-700 mt-2" />
                    Create Idea
                </button>
                <button
                    onClick={toggleAiChat}
                    className="flex flex-col-reverse items-center text-xs font-semibold text-slate-700 cursor-pointer"
                >
                    <GiArtificialHive
                        size={22}
                        className="text-slate-500 mt-2"
                    />
                    Ask AI
                </button>

                <button
                    onClick={handleRecentClick}
                    className="flex flex-col-reverse items-center text-xs font-semibold text-slate-700 cursor-pointer"
                >
                    <IoTime size={22} className="text-slate-500 mt-2" />
                    Recent
                </button>
            </div>
        </div>
    );
};

export default MenuBar;
