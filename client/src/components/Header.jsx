import IdeaNotes from "./IdeaNotes";

const Header = ({ ideaData, fetchIdeas, handleEdit }) => {
    return (
        <div className="w-full p-8">
            <h1 className="text-2xl font-bold text-slate-700 p-2">
                Welcome Back, Nick!
            </h1>
            <div className="mt-16">
                <IdeaNotes
                    ideas={ideaData}
                    fetchIdeas={fetchIdeas}
                    handleEdit={handleEdit}
                />
            </div>
        </div>
    );
};

export default Header;
