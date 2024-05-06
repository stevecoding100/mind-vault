import { IoMenu } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import { Link } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { useState } from "react";

const MobileSideMenu = ({ name, userName, handleSignOut }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <div className="w-full h-[80px]  flex justify-between  items-center p-6 md:hidden  bg-blue-700">
                {/*Menu Icon and Logo */}
                <div onClick={toggleMenu}>
                    <IoMenu size={30} className="text-white" />
                </div>
                <div className="flex items-center">
                    <LuBrainCircuit size={18} className="text-white" />
                    <h5 className="font-bold text-lg ml-2 text-white">
                        MindVault
                    </h5>
                </div>

                {/* Toggled side menu*/}
                <div
                    className={`bg-slate-100 z-50 p-2 absolute min-h-screen w-[280px] left-0 top-20 ${
                        isMenuOpen ? "block" : "hidden"
                    }`}
                >
                    {/* Profile Image and userName */}
                    <div className="flex  items-center p-2 w-full h-30  border-b-2 border-slate-300 pb-4">
                        <Link to="#">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                alt="profile avatar"
                                className="w-10 h-10 rounded-full border-1 border-white"
                            />
                        </Link>
                        <div className="ml-4">
                            <p className="text-slate-900 font-bold text-lg">
                                {name}
                            </p>
                            <p className="text-slate-700 text-sm">{userName}</p>
                        </div>
                    </div>
                    {/* Privacy and policy - Sign Out button */}
                    <div className="flex flex-col mt-16 p-2 absolute bottom-10">
                        <Link className="flex items-center mb-2 font-medium text-slate-500 text-md">
                            <CgSupport className="mr-2" /> Support
                        </Link>
                        <Link className="flex items-center mb-2 font-medium text-slate-500 text-md">
                            <GrCircleInformation className="mr-2" /> About
                        </Link>
                        <Link className="flex items-center mb-2 font-medium text-slate-500 text-md">
                            <BsBook className="mr-2" /> Privacy Policy
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="py-3 px-4 mt-4 bg-blue-200 rounded-md tracking-wide font-bold text-slate-600 hover:bg-red-500 hover:text-slate-100 "
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSideMenu;
