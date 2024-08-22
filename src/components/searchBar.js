import {getCoordinates} from "@/state/slice";
import {useState} from 'react';
import { useDispatch} from 'react-redux';

const SearchBar = () => {
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState('');

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        dispatch(getCoordinates({city: searchInput}))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <div className='search-bar'>
            <input className='search-input' type='text' placeholder='Type the location' value={searchInput}
                   onChange={handleChangeSearch} onKeyDown={handleKeyDown}></input>
            <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
    );
}
export default SearchBar;