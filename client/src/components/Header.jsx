import IdeaNotes from "./IdeaNotes";

const Header = ({ ideaData }) => {
    return (
        <div className="w-full h-full p-8">
            <h1 className="text-2xl font-bold text-slate-700">
                Welcome Back, Nick!
            </h1>
            <div className="mt-16">
                <IdeaNotes ideas={ideaData} />
            </div>
        </div>
    );
};

export default Header;
