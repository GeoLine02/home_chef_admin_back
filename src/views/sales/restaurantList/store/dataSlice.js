import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { http } from 'utils/http'

export const initialFilterData = {
    name: '',
    owenrId: '',
    status: ['active', 'blocked', 'deleted'],
}

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const deleteRestaurant = createAsyncThunk(
    'salesRestaurantList/data/deleteRestaurant',
    async (id) => {
        try {
            const apiCallOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }
            const resp = await http(`/restaurant/delete/${id}`, apiCallOptions)
            if (resp.ok) {
                const data = await resp.json()
                console.log('data', data)
                return data
            }
        } catch (err) {
            console.log('delete restaurant error: ', err)
        }
    }
)

export const getRestaurantList = createAsyncThunk(
    'salesRestaurantList/data/getRestaurantList',
    async () => {
        try {
            const apiCallOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            }
            const resp = await http(
                `/restaurant
                `,
                apiCallOptions
            )
            if (resp.ok) {
                const data = await resp.json()
                return data
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const searchRestaurant = createAsyncThunk(
    'salesRestaurantList/data/searchRestaurant',

    async (data) => {
        try {
            const apiCallOptions = {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'GET',
            }

            const resp = await http(`/restaurant?name=${data}`, apiCallOptions)
            if (resp.ok) {
                const data = await resp.json()
                return data
            }
        } catch (err) {
            console.log(err)
        }
    }

    // async (data) => {
    //     try {
    //         const apiCallOptions = {
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //             method: 'POST',
    //             body: JSON.stringify({ searchText: data }),
    //         }
    //         const resp = await http('/search', apiCallOptions)
    //         if (resp.ok) {
    //             const data = resp.json()
    //             return data
    //         }
    //     } catch (err) {
    //         console.log('restaurant search error:', err)
    //     }
    // }
)

const dataSlice = createSlice({
    name: 'salesRestaurantList/data',
    initialState: {
        loading: false,
        restaurantList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
        error: '',
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getRestaurantList.fulfilled]: (state, action) => {
            state.restaurantList = action.payload
            state.loading = false
        },
        [getRestaurantList.pending]: (state) => {
            state.loading = true
        },
        [getRestaurantList.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false
        },
        [searchRestaurant.pending]: (state) => {
            state.loading = true
        },
        [searchRestaurant.fulfilled]: (state, action) => {
            state.restaurantList = action.payload
            state.loading = false
        },
        [searchRestaurant.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false
        },
    },
})

export const { setTableData } = dataSlice.actions

export default dataSlice.reducer
