import { FaPlusCircle } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { GrInProgress } from "react-icons/gr";
import { IoTime } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const MenuBar = ({
    onOpen,
    handleDisplayAllIdeas,
    handleDisplayInProgressIdeas,
    toggleSearchInput,
    handleRecentClick,
    handleHomeClick,
}) => {
    const handleDisplayAllIdeasAndHomeClick = () => {
        handleDisplayAllIdeas();
        handleHomeClick();
    };
    return (
        <div>
            {/* Menu Bar */}
            <div className="mx-auto flex  bg-white items-center justify-between px-5 left-0 right-0 absolute bottom-0 h-16 border-t-2   border-slate-300">
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
                    <FaPlusCircle size={22} className="text-blue-700 mt-2" />
                    Create Idea
                </button>
                <button
                    onClick={toggleSearchInput}
                    className="flex flex-col-reverse items-center text-xs font-semibold text-slate-700 cursor-pointer"
                >
                    <FaSearch size={22} className="text-slate-500 mt-2" />
                    Search
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
