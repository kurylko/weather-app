import SearchBar from "@/components/searchBar";

const Header = ({searchInput, handleChangeSearch,handleSearch}) => {

    return(
        <header>
            <SearchBar searchInput={searchInput} handleChangeSearch={handleChangeSearch} handleSearch={handleSearch}></SearchBar>
        </header>
    );
}
export default Header;