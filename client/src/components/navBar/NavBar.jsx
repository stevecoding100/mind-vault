import React from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { FaBell } from "react-icons/fa";
const NavBar = ({ name, userName }) => {
    return (
        <div className="flex items-center justify-between  pt-8 px-5 md:p-12 w-full">
            {/* Logo Section */}
            <div className="flex items-center">
                <LuBrainCircuit size={22} className="text-blue-700" />
                <h4 className="text-[#3f475a] text-lg ml-2 font-bold">
                    MindVault
                </h4>
            </div>
            {/* User Profile */}
            <div className="flex items-center">
                <FaBell
                    size={20}
                    className="text-[#666D80] hidden md:block mr-8 cursor-pointer"
                />
                <div className="flex">
                    <img
                        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="profile picture"
                        className="w-[40px] h-[40px] rounded-full object-cover mr-3 cursor-pointer"
                    />

                    <div>
                        <p className="font-bold text-sm md:text-md ">{name}</p>
                        <p className="text-sm">{userName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
