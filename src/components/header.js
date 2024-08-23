import {useState} from 'react';
import {getCoordinates} from "@/state/searchPlaceSlice";
import { useDispatch} from 'react-redux';

const Header = () => {
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState('');

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        dispatch(getCoordinates({city: searchInput}));
        setSearchInput('');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            setSearchInput('');
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
export default Header;