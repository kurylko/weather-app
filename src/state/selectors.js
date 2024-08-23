import {createSelector} from "@reduxjs/toolkit";
import {parsePlaceData} from "@/utils/parsePlaceData";

const selectPlacesState = (state) => state.places;


export const selectCurrentPlace = createSelector(
    [selectPlacesState],
    placesState => parsePlaceData(placesState.data),
);

