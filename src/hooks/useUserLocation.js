import {useState, useEffect} from "react";
import {parsePlaceData} from "@/utils/parsePlaceData";

const useUserLocation = () => {
    const [geoLocationData, setGeoLocationData] = useState(null);
    const [geoLocationError, setGeoLocationError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeoLocationData(parsePlaceData({placeData: position?.coords}));
                },
                (error) => {
                    setGeoLocationError('Oops.Can not get your geolocation');
                }
            );
        } else {
            setGeoLocationError('Your geolocation is not supported by your browser');
        }
    }, []);

    return {geoLocationData, geoLocationError};
}

export default useUserLocation;