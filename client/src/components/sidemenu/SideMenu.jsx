import React from "react";
import { BiHome } from "react-icons/bi";
import { IoRocketOutline } from "react-icons/io5";
import { PiStarFourBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { GrCircleInformation } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SideMenu = ({
    onOpen,
    handleDisplayAllIdeas,
    handleDisplayInProgressIdeas,
    toggleAiChat,
}) => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        // Clear user authentication data from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("userName");

        // Redirect to the sign-in page or any other desired route
        navigate("/");
    };
    return (
        <div className="w-[300px] p-12 hidden lg:block min-h-screen">
            <ul>
                <li className="flex items-center mb-8 font-bold text-xs lg:text-sm hover:text-blue-700 cursor-pointer">
                    <BiHome size={18} className="mr-2" />
                    <button onClick={handleDisplayAllIdeas}>Dashboard</button>
                </li>
                <li className="flex items-center mb-8 font-bold text-xs lg:text-sm hover:text-blue-700 cursor-pointer">
                    <IoRocketOutline size={18} className="mr-2" />
                    <button onClick={handleDisplayInProgressIdeas}>
                        In Progress
                    </button>
                </li>
                <li className="flex items-center mb-8 font-bold text-xs lg:text-sm hover:text-blue-700 cursor-pointer">
                    <PiStarFourBold size={18} className="mr-2" />
                    <button onClick={toggleAiChat}>AI Chat</button>
                </li>
                <li className="flex items-center mb-8 font-bold text-xs lg:text-sm hover:text-blue-700 cursor-pointer">
                    <IoSettingsOutline size={18} className="mr-2" />
                    <button>Settings</button>
                </li>
            </ul>

            <button
                onClick={onOpen}
                className="w-36 h-14 mt-6 font-bold rounded-md bg-blue-700 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Create Idea
            </button>
            <div className="mt-48 p-2">
                <ul className="mb-20">
                    <li className="mb-5 text-sm text-[#505970] flex items-center hover:text-blue-700 cursor-pointer">
                        <GrCircleInformation className="mr-2" fontSize={16} />
                        Support
                    </li>
                    <li className="mb-5 text-sm text-[#505970] flex items-center hover:text-blue-700 cursor-pointer">
                        <CgSupport className="mr-2" fontSize={16} /> About
                    </li>
                    <li className="mb-5 text-sm text-[#505970] flex items-center hover:text-blue-700 cursor-pointer">
                        <BsBook className="mr-2" fontSize={16} />
                        Privacy Policy
                    </li>
                </ul>

                <button
                    onClick={handleSignOut}
                    className="py-3 px-4 mt-4 bg-blue-200 rounded-md tracking-wide font-bold text-slate-600 hover:bg-red-500 hover:text-slate-100 "
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default SideMenu;
