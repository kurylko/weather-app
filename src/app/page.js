'use client';

import './global.css';
import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastCard from "@/components/ForecastCard";
import AstroCard from "@/components/AstroCard";
import useForecast from "@/hooks/useForecast";
import {useSelector} from "react-redux";
import {selectPlaceFromSearch} from "@/state/selectors";
import HourlyWeatherCard from "@/components/HourlyWeatherCard";
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import {getBigWeatherIcon} from "@/utils/getBigWeatherIcon";
import {getUvIcon} from "@/utils/getUvIcon";
import Loader from "@/components/Loader";
import newMoon from "../../public/icons/new-moon.png";
import fullMoon from "../../public/icons/full-moon.png";
import crescentMoon from "../../public/icons/crescent-moon.png";
import LocationCard from "@/components/LocationCard";
import AirQualityCard from "@/components/AirQualityCard";
import {getAirQualityDescription} from "@/utils/getAirQualityDescription";
import UvAlertCard from "@/components/UvAlertCard";
import {getUvAlert} from "@/utils/getUvAlert";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();

    const {geoLocationData, geoLocationError} = useUserLocation();
    const placeFromSearch = useSelector(selectPlaceFromSearch);

    const activeLocation = placeFromSearch || geoLocationData


    useEffect(() => {
        if (geoLocationData || placeFromSearch) {
            router.push({
                pathname: '/weather',
                query: { location: JSON.stringify(activeLocation) },
            });
        } else {
            router.push('/no-geoData');
        }
    }, [activeLocation, router]);




    return (
        <h1>Loading...</h1>
    );
}
