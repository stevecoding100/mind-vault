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
const SideMenu = () => {
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
    return (
        <div className="min-h-screen w-[250px] bg-slate-100 flex flex-col  p-2 pt-4 border-r-2 border-slate-300 shadow-md">
            <div className="flex justify-between w-full h-30 border-b-1 border-slate-300 pb-4">
                <Link to="#">
                    <img
                        src="https://www.next.us/nxtcms/resource/blob/5791594/0b81a7d7db30a12f5494cbc97b53c573/knitwear-data.jpg"
                        alt="profile avatar"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                </Link>
                <div className="text-sm">
                    <p className="text-slate-900 font-bold">Nick Woods</p>
                    <p className="text-slate-700">nick.woods@gmail.com</p>
                </div>
            </div>
            <div className="pt-4 flex flex-col border-b-1 border-slate-300 h-80">
                <button className="w-full  h-12 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-150 ease-in-out font-bold">
                    + New Idea
                </button>
                <div className="pt-6">
                    {navLinks.map((link) => (
                        <Link
                            to={link.to}
                            key={link.key}
                            className="flex tracking-wide items-center text-sm font-semibold  p-2 w-full h-12 hover:bg-blue-300 rounded-lg transition duration-150 ease-in-out text-slate-800"
                        >
                            <link.icon
                                className="mr-3 text-slate-400"
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
                    <Link className="mb-3 font-medium">1. Build AI Tool</Link>
                    <Link className="mb-3 font-medium">
                        2. Build Data Analyst
                    </Link>
                    <Link className="mb-3 font-medium">3. Build AI Tool</Link>
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
