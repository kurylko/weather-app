import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {parsePlaceData} from "@/utils/parsePlaceData";

const initialState = {
    data: null,
    isLoading: false,
}


export const getCoordinates = createAsyncThunk(
    'searchPlace/getCoordinates',
    async ({city}, {rejectWithValue}) => {

        //const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;

        const url = `/api/get-coordinates/?address=${encodeURIComponent(city)}`;
        console.log(url)
        try {
            //const response = await fetch(url);
            const response = await fetch(url);
            console.log('Response:', response);


            if (!response.ok) {
                return rejectWithValue(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('data', data.placeData);

            if (data?.results && data.results.length > 0) {
                const placeData = data.placeData;
                return parsePlaceData({placeData}) || rejectWithValue('No results found');
            }

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
