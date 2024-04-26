import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ value, handleSearchChange }) => {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={handleSearchChange}
                placeholder="Search ideas..."
                className="border border-gray-300 rounded-md p-3 w-full mb-4"
            />
            <AiOutlineSearch className="absolute right-4 top-4 text-gray-400" />
        </div>
    );
};

export default SearchInput;
