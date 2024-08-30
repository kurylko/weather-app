'use client';

import './global.css';
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Loader from "@/components/Loader";

export default async function Home() {
    const router = useRouter();


    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    router.push('/weather');
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                    router.push('/no-geoData');
                }
            );
        } else {
            console.warn('Geolocation error: Browser doesnt support geolocation');
            router.push('/no-geoData');
        }
    }, [router]);




    return (
        <div className='start-page'>
            <Loader loaderText={'Loading'}/>
        </div>
    );
}
