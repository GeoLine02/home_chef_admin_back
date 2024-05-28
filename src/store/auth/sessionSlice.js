import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from 'utils/http'

export const getUserByToken = createAsyncThunk(
    'auth/userByToken',
    async (token) => {
        try {
            const apiCallOptions = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            }

            const resp = await http('/auth/login', apiCallOptions)
            if (resp.ok) {
                const data = resp.json()
                console.log(data)
                return data
            }
        } catch (err) {
            console.log('user by token error:', err)
        }
    }
)

export const fetchSignIn = createAsyncThunk(
    'auth/logIn',
    async ({ email, password }) => {
        try {
            const apiCallOptions = {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }
            const resp = await http('/auth/login', apiCallOptions)
            if (resp.ok) {
                const data = resp.json()
                console.log(data)
                return data
            }
        } catch (err) {
            console.log('user sign in error:', err)
        }
    }
)

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    },
    extraReducers: {
        [getUserByToken.fulfilled]: (state, action) => {
            state.token = action.payload
            state.signedIn = true
        },
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken } =
    sessionSlice.actions

export default sessionSlice.reducer
