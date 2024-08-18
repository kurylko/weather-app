import {useState, useEffect} from "react";

const useUserLocation = () => {
    const [location, setLocation] = useState({latitude: null, longitude: null});
    const [error, setError] = useState(null);


    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setError('Oops.Can not get your geolocation');
                }
            );
        } else {
            setError('Your geolocation is not supported by your browser');
        }
    }, []);

    return {actualLocation: location, error};
}

export default useUserLocation;