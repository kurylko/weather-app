import { createSelector } from '@reduxjs/toolkit'

const selectPlacesState = (state) => state.searchPlaceSlice

export const selectPlaceFromSearch = createSelector(
  [selectPlacesState],
  (placesState) => placesState.data
)
