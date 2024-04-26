import IdeaNotes from "./IdeaNotes";

const Header = ({
    ideaData,
    handleEdit,
    onOpenChange,
    handleDelete,
    inProgressIdeas,
    displayAllIdeas,
    searchVisible,
    filterIdeas,
    filteredIdeas,
}) => {
    return (
        <div className="w-full p-8">
            <h1 className="text-2xl font-bold text-slate-700 p-2">
                Welcome Back, Nick!
            </h1>
            <div className="mt-16">
                <IdeaNotes
                    ideas={ideaData}
                    handleEdit={handleEdit}
                    onOpenChange={onOpenChange}
                    handleDelete={handleDelete}
                    inProgressIdeas={inProgressIdeas}
                    displayAllIdeas={displayAllIdeas}
                    searchVisible={searchVisible}
                    filterIdeas={filterIdeas}
                    filteredIdeas={filteredIdeas}
                />
            </div>
        </div>
    );
};

export default Header;
