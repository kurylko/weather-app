
const SearchBar = ({searchInput, handleSearch, handleChangeSearch}) => {

    return(
        <div>
            <input type='text' placeholder='Type the location' value={searchInput} onChange={handleChangeSearch}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
export default SearchBar;