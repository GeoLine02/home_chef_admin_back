import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from 'utils/http'

export const createRestaurant = createAsyncThunk(
    'salesRestaurantEdit/data/createRestaurant',
    async (data) => {
        console.log(data)
        try {
            const apiCallOptions = {
                method: 'POST',
                body: JSON.stringify(data),
            }
            const resp = await http('/restaurant/add', apiCallOptions)
            return resp.json()
        } catch (error) {
            console.log(error)
        }
    }
)

export const getRestaurantById = createAsyncThunk(
    'salesRestaurantEdit/data/restaurantById',
    async (id) => {
        try {
            const apiCallOptions = {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'GET',
            }
            const resp = await http(`/restaurant/${id}`, apiCallOptions)
            if (resp.ok) {
                const data = await resp.json()
                return data
            }
        } catch (err) {
            console.log('get restaurant by id error:', err)
        }
    }
)

export const saveUpdatedRestaurant = createAsyncThunk(
    'salesRestaurantEdit/data/updateRestaurant',
    async (data) => {
        try {
            const apiCallOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }
            const resp = await http(
                `/restaurant/update/${data.id}`,
                apiCallOptions
            )
            if (resp.ok) {
                const data = await resp.json()
                console.log(data)
                return data
            }
        } catch (err) {
            console.log('restaurant update error: ', err)
        }
    }
)

const dataSlice = createSlice({
    name: 'salesRestaurantEdit/data',
    initialState: {
        loading: false,
        restaurantData: [],
        error: '',
    },
    reducers: {},
    extraReducers: {
        [createRestaurant.fulfilled]: (state, action) => {
            state.restaurantData = action.payload
            state.loading = false
        },
        [createRestaurant.pending]: (state) => {
            state.loading = true
        },
        [createRestaurant.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false
        },
        [getRestaurantById.fulfilled]: (state, action) => {
            state.restaurantData = action.payload
            state.loading = false
        },
        [getRestaurantById.pending]: (state) => {
            state.loading = true
        },
        [getRestaurantById.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [saveUpdatedRestaurant.fulfilled]: (state, action) => {
            state.laoding = false
            state.restaurantData = action.paylaod
        },
        [saveUpdatedRestaurant.pending]: (state) => {
            state.loading = true
        },
        [saveUpdatedRestaurant.rejected]: (state, action) => {
            state.laoding = false
            state.error = action.error
        },
    },
})

export default dataSlice.reducer
