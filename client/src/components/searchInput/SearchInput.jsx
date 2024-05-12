import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ value, handleSearchChange }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={handleSearchChange}
                placeholder="Search idea..."
                className=" px-4 w-[350px] mt-12 mb-12 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 lg:hidden"
            />
            <input
                type="text"
                value={value}
                onChange={handleSearchChange}
                placeholder="Search idea..."
                className="h-10 px-4 min-w-[250px] hidden lg:block rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
        </div>
    );
};

export default SearchInput;
