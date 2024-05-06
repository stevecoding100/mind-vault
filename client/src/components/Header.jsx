import IdeaNotes from "./IdeaNotes";
import MobileActivity from "./smallScreens/MobileActivity";

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
    name,
    toggleSearchInput,
}) => {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    return (
        <div className="md:p-8 w-full">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 px-5 md:p-2">
                {`Welcome Back, ${name}`}
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
                    isLoggedIn={isLoggedIn}
                    toggleSearchInput={toggleSearchInput}
                />
            </div>
        </div>
    );
};

export default Header;
