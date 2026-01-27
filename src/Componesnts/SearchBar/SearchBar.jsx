import { useState } from "react";

// lets accept the prop when we search the state change 
const SearchBar =({onSearch})=>{

    const [searchText, setSearchText] = useState("");

    const handleInputChange= (e) =>{

        const text = e.target.value;

        setSearchText(text);

        onSearch(text);

    }
    return(
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search items" value={searchText} 
            onChange={handleInputChange}
            />
            <span className="input-group-text bg-warning text-dark">
                <i className="bi bi-search"></i>
            </span>
        </div>
    );
};
export default SearchBar;