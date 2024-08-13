
const SearchBar = ({searchInput, handleSearch, handleChangeSearch}) => {

    return(
        <div class=' flex gap-2'>
            <input class='rounded-md pl-2' type='text' placeholder='Type the location' value={searchInput} onChange={handleChangeSearch}></input>
            <button class='bg-zinc-300 rounded-md pl-0.5' onClick={handleSearch}>Search</button>
        </div>
    );
}
export default SearchBar;