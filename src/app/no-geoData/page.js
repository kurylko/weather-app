'use client';
import Image from "next/image";
import searchIcon from "../../../public/icons/search.png";
import {useRouter} from "next/navigation";

export default async function NoGeoData() {
    const router = useRouter();

    return (
        <div className='no-user-geolocation-page'>
            Can`t get your geolocation. Please, type the location in search to discover the weather forecast.
            <div className='search-bar'>
                <div className='search-input-wrapper'>
                    <input className='search-input' type='text' placeholder='Type the location'></input>
                    <Image src={searchIcon} alt="search icon" className="search-icon"/>
                </div>
                <button className='search-button' onClick={() => router.push('/weather')}>Search</button>
            </div>
        </div>
    );
}