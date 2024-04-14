import IdeaNotes from "./IdeaNotes";

const Header = () => {
    return (
        <div className="w-full h-full p-8">
            <h1 className="text-2xl font-bold text-slate-700">
                Welcome Back, Nick!
            </h1>
            <div className="mt-16">
                <IdeaNotes />
            </div>
        </div>
    );
};

export default Header;
