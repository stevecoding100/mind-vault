import React, { useState } from "react";

const SettingsMenu = () => {
    return (
        <div className="relative">
            <div className="absolute w-[300px] bg-white rounded-lg shadow-lg">
                <ul className="py-1">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Notifications
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Appearance
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Account
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SettingsMenu;
