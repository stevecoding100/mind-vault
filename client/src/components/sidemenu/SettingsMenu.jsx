import React, { useState } from "react";

const settingLinks = [
    {
        title: "Profile",
        link: "#",
    },
    {
        title: "Notifications",
        link: "#",
    },
    {
        title: "Appearance",
        link: "#",
    },
    {
        title: "Account",
        link: "#",
    },
];
const SettingsMenu = ({ handleSignOut }) => {
    return (
        <div className="min-h-screen w-full">
            <h1 className="text-lg md:text-2xl font-bold m-4">Settings</h1>
            <div className="bg-white rounded-lg shadow-lg h-full">
                <ul className="py-1 px-3">
                    {settingLinks.map((link) => (
                        <li
                            key={link.id}
                            className="px-4 py-4 md:py-6 hover:bg-gray-100 cursor-pointer bottom-2 border-t-1"
                        >
                            {link.title}
                        </li>
                    ))}
                    <li className="px-2 py-4 md:py-6 hover:bg-gray-100 cursor-pointer bottom-2 border-t-1">
                        <button
                            onClick={handleSignOut}
                            className="py-3 px-4  bg-blue-100 rounded-md tracking-wide font-bold text-slate-600 hover:bg-red-500 hover:text-slate-100 "
                        >
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SettingsMenu;
