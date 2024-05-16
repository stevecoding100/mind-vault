import React from "react";
import { BiHome } from "react-icons/bi";
import { IoRocketOutline } from "react-icons/io5";
import { PiStarFourBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
const MobileMenuBar = ({ onOpen, toggleIdeas }) => {
    return (
        <div className="sticky   bottom-0 w-full h-full lg:hidden p-4 bg-slate-800">
            <ul className="flex justify-between h-[80px] mt-1">
                <button>
                    <Link to="/dashboard">
                        <li className="flex flex-col items-center  font-bold text-xs text-slate-200">
                            <BiHome size={20} className="mb-5" />
                            Dashboard
                        </li>
                    </Link>
                </button>

                {/* <button onClick={toggleIdeas}>
                    <li className="flex flex-col items-center font-bold text-xs text-slate-200">
                        <IoRocketOutline size={20} className="mb-5" />
                        In Progress
                    </li>
                </button> */}
                <button onClick={onOpen}>
                    <li className="flex flex-col items-center font-bold text-xs mb-3 text-slate-200">
                        <FaPlus
                            size={20}
                            className="mb-4 text-white bg-blue-700 w-[35px] h-[35px] p-2 rounded-full"
                        />
                        Create Idea
                    </li>
                </button>

                <button>
                    <Link to="/aichat">
                        <li className="flex flex-col items-center  font-bold text-xs text-slate-200">
                            <PiStarFourBold size={20} className="mb-5" />
                            AI Chat
                        </li>
                    </Link>
                </button>
                <button>
                    <Link to="/settings">
                        <li className="flex flex-col items-center  font-bold text-xs text-slate-200">
                            <IoSettingsOutline size={20} className="mb-5" />
                            Settings
                        </li>
                    </Link>
                </button>
            </ul>
        </div>
    );
};

export default MobileMenuBar;
