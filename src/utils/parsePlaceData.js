export const parsePlaceData = ({ placeData }) =>
  placeData
    ? {
        ...placeData,
        lat: placeData?.latitude || placeData?.lat,
        lon: placeData?.longitude || placeData?.lng,
      }
    : null
