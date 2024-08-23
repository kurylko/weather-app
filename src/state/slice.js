import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {parsePlaceData} from "@/utils/parsePlaceData";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


const initialState = {
    data: null,
    isLoading: false,
}



export const getCoordinates = createAsyncThunk(
    'searchPlace/getCoordinates',
    async ({ city }, { rejectWithValue }) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
        console.log(1111)
        try {
            const response = await axios.get(url, {
                params: {
                    address: city,
                    key: apiKey,
                },
            });

            const placeData = response?.data?.results[0]?.geometry?.location;
            return parsePlaceData({placeData}) || rejectWithValue('No results found')
        } catch (error) {
            console.error('Geocoding error:', error);
            return rejectWithValue('Failed to fetch coordinates');
        }
    }
);

const searchPlaceSlice = createSlice({
    name: 'searchPlace',
    initialState,
    reducers: {
        testRed: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoordinates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoordinates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(getCoordinates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch coordinates';
            });
    },
});

export default searchPlaceSlice.reducer;
