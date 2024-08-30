'use client'
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {getCoordinates} from "@/state/searchPlaceSlice";
import SearchBar from "@/components/SearchBar";
import {useEffect, useRef, useState} from "react";

export default function NoGeoDataPage() {
    const router = useRouter();

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
            router.push('/weather');
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            setSearchInput('');
            if (inputRef.current) {
                inputRef.current.blur();
                router.push('/weather');
            }
        }
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    router.push('/weather');
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                }
            );
        } else {
            console.warn('No geolocation in browser')
        }
    }, [router]);


    return (
        <div className='no-user-geolocation-page'>
            <span className='no-geolocation-text'>Please, type the location in search to see the weather forecast or enable geolocation in your browser.</span>
            <SearchBar onClick={handleSearch} onKeyDown={handleKeyDown} onChange={handleChangeSearch}
                       searchInput={searchInput} inputRef={inputRef}/>
        </div>
    );
}