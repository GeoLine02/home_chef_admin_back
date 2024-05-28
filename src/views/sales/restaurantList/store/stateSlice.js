import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesRestaurantList/state',
    initialState: {
        deleteConfirmation: false,
        selectedRestaurant: '',
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedRestaurant: (state, action) => {
            state.selectedRestaurant = action.payload
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedRestaurant } =
    stateSlice.actions

export default stateSlice.reducer
