import React, {useState} from "react"

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');

     const handleChange = (e) => {
         e.preventDefault();
         setSearchInput(e.target.value);
     }

     const handleSearch = () => {
         console.log(searchInput);
     }

    return(
        <div>
            <input type='text' placeholder='Type the location' value={searchInput} onChange={handleChange}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
export default SearchBar;