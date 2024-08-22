export const parseGoogleApiPlace = googleApiResponse => ({
    ...googleApiResponse,
    placeFromSearchLat: googleApiResponse?.lat,
    placeFromSearchLon: googleApiResponse?.lng
});
