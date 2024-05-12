import React from "react";
import { BiHome } from "react-icons/bi";
import { IoRocketOutline } from "react-icons/io5";
import { PiStarFourBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
const MobileMenuBar = ({
    onOpen,
    handleDisplayAllIdeas,
    handleDisplayInProgressIdeas,
    toggleAiChat,
}) => {
    return (
        <div className="absolute bottom-0 w-full h-[100px] lg:hidden px-4 bg-slate-800">
            <ul className="flex justify-between mt-4">
                <button onClick={handleDisplayAllIdeas}>
                    <li className="flex flex-col items-center  font-bold text-sm text-slate-200">
                        <BiHome size={24} className="mb-5" />
                        Dashboard
                    </li>
                </button>
                <button onClick={handleDisplayInProgressIdeas}>
                    <li className="flex flex-col items-center font-bold text-sm text-slate-200">
                        <IoRocketOutline size={22} className="mb-5" />
                        In Progress
                    </li>
                </button>
                <button onClick={onOpen}>
                    <li className="flex flex-col items-center font-bold text-sm text-slate-200">
                        <FaPlus
                            size={24}
                            className="mb-2 text-white bg-blue-700 w-[35px] h-[35px] p-2 rounded-full"
                        />
                        Create Idea
                    </li>
                </button>
                <button onClick={toggleAiChat}>
                    <li className="flex flex-col items-center  font-bold text-sm text-slate-200">
                        <PiStarFourBold size={24} className="mb-5" />
                        AI Chat
                    </li>
                </button>
                <button>
                    <li className="flex flex-col items-center  font-bold text-sm text-slate-200">
                        <IoSettingsOutline size={24} className="mb-5" />
                        Settings
                    </li>
                </button>
            </ul>
        </div>
    );
};

export default MobileMenuBar;
