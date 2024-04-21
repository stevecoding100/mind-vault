import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { GrInProgress } from "react-icons/gr";
import { BsLightbulb } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronCompactUp } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import CreatingIdeaModal from "./CreatingIdeaModal";
const SideMenu = ({ onOpen }) => {
    const navLinks = [
        {
            icon: AiOutlineSearch,
            name: "Search",
            to: "#",
        },
        {
            icon: BiHome,
            name: "Home",
            to: "#",
        },
        {
            icon: GrInProgress,
            name: "Inprogress",
            to: "#",
        },
    ];
    const ideas = [
        {
            title: "AI Automation",
            description: "Lorem Ipsum manie james jiole",
            category: "In Progress",
        },
        {
            title: "Car AI New Tech",
            description: "Lorem Ipsum manie james jiole",
            category: "Complete",
        },
        {
            title: "Prime Juicer AI",
            description: "Lorem Ipsum manie james jiole",
            category: "Complete",
        },
        {
            title: "Alexa 2.0 AI Prime",
            description: "Lorem Ipsum manie james jiole",
            category: "In Progress",
        },
    ];
    return (
        <div className="min-h-screen w-[250px] bg-slate-100 flex flex-col  p-4 pt-4 border-r-2 border-slate-300 shadow-md">
            <div className="flex justify-between w-full h-30 border-b-2 border-slate-300 pb-4">
                <Link to="#">
                    <img
                        src="https://www.next.us/nxtcms/resource/blob/5791594/0b81a7d7db30a12f5494cbc97b53c573/knitwear-data.jpg"
                        alt="profile avatar"
                        className="w-10 h-10 rounded-full border-1 border-white"
                    />
                </Link>
                <div className="text-sm">
                    <p className="text-slate-900 font-bold">Nick Woods</p>
                    <p className="text-slate-700">nick.woods@gmail.com</p>
                </div>
            </div>
            <div className="pt-4 flex flex-col border-b-2 border-slate-300 h-80">
                <button
                    onClick={onOpen}
                    className="w-full  h-12 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-150 ease-in-out font-bold"
                >
                    + New Idea
                </button>
                <div className="pt-6">
                    {navLinks.map((link) => (
                        <Link
                            to={link.to}
                            key={link.key}
                            className="flex tracking-wide items-center text-sm font-semibold  p-2 w-full h-12 hover:bg-blue-300 rounded-lg transition duration-150 ease-in-out text-slate-700 hover:text-blue-700"
                        >
                            <link.icon
                                className="mr-3 group-hover text-slate-400 "
                                fontSize={18}
                            />
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center p-2">
                <div className="flex items-center w-full">
                    <BsLightbulb
                        className="mr-2 text-slate-400"
                        fontSize={16}
                    />{" "}
                    <h2 className="text-md font-semibold text-slate-700">
                        Ideas
                    </h2>
                    <BsChevronCompactUp
                        className="ml-24 cursor-pointer"
                        fontSize={18}
                    />
                </div>
                <div className="pt-6 flex text-sm flex-col w-full p-2 text-slate-800 h-[50vh] overflow-y-scroll">
                    {ideas.map((item) => (
                        <div
                            key={item.key}
                            className="mb-4 py-3 px-3 w-full bg-blue-100 shadow-sm text-slate-700 rounded-md font-semibold"
                        >
                            <Link className="">{item.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col mt-16 p-2">
                <Link className="flex items-center mb-2 font-medium text-slate-500">
                    <CgSupport className="mr-2" /> Support
                </Link>
                <Link className="flex items-center mb-2 font-medium text-slate-500">
                    <GrCircleInformation className="mr-2" /> About
                </Link>
                <Link className="flex items-center mb-2 font-medium text-slate-500">
                    <BsBook className="mr-2" /> Privacy Policy
                </Link>
                <Link to="#">
                    <button className="py-3 px-4 mt-4 bg-blue-200 rounded-md tracking-wide font-bold text-slate-600 hover:bg-red-500 hover:text-slate-100 ">
                        Sign Out
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SideMenu;
