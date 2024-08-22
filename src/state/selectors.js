import {createSelector} from "@reduxjs/toolkit";
import {parseGoogleApiPlace} from "@/utils/parseGoogleApiPlace";

const selectPlacesState = (state) => state.places;


export const selectCurrentPlace = createSelector(
    [selectPlacesState],
    placesState => parseGoogleApiPlace(placesState.data),
);

