import {useEffect, useRef, useState} from 'react';
import {getCoordinates} from "@/state/searchPlaceSlice";
import {useDispatch} from 'react-redux';
import searchIcon from './../../public/icons/search.png';
import Image from "next/image";
import HeaderLocation from "@/components/HeaderLocation";
import useUserLocation from "@/hooks/useUserLocation";
import {getCityName} from "@/utils/getCityName";
import {parsePlaceData} from "@/utils/parsePlaceData";

const Header = () => {
    const [city, setCity] = useState(null);

    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState('');
    const inputRef = useRef(null);

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        dispatch(getCoordinates({city: searchInput}));
        setSearchInput('');
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            setSearchInput('');
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const browserLocation = useUserLocation();
    const locationData = browserLocation?.geoLocationData?.lat != null ? browserLocation?.geoLocationData : null;

    useEffect(() => {
        const fetchCityName = async () => {
            if (locationData) {
                const cityName = await getCityName({ geolocationData: locationData });
                setCity(cityName);
            }
        };

        fetchCityName();
    }, [locationData]);

    console.log(locationData ? `cityName: ${city}`  : '');


    return (
        <header>
            <HeaderLocation city={city}/>
            <div className='search-bar'>
                <div className='search-input-wrapper'>
                    <input className='search-input' type='text' placeholder='Type the location' value={searchInput}
                           onChange={handleChangeSearch} onKeyDown={handleKeyDown} ref={inputRef}></input>
                    <Image src={searchIcon} alt="search icon" className="search-icon"/>
                </div>
                <button className='search-button' onClick={handleSearch}>Search</button>
            </div>
        </header>
    );
}
export default Header;