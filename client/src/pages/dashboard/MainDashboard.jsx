import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import { useState, useEffect } from "react";
import axios from "axios";

const MainDashboard = () => {
    return (
        <div className="flex bg-blue-100">
            <SideMenu />
            <div className="flex flex-col w-full">
                <Header />
            </div>
            <div className="w-[430px]">
                <Activity />
            </div>
        </div>
    );
};

export default MainDashboard;
