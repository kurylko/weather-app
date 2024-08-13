
const SearchBar = ({searchInput, handleSearch, handleChangeSearch}) => {

    return(
        <div className='search-bar'>
            <input className='search-input' type='text' placeholder='Type the location' value={searchInput} onChange={handleChangeSearch}></input>
            <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
    );
}
export default SearchBar;