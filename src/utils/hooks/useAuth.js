import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { http } from 'utils/http'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    // const logIn = async (values) => {
    //     try {
    //         const { email, password } = values

    //         const apiCallOptions = {
    //             headers: {
    //                 'content-type': 'application/json',
    //             },
    //             method: 'POST',
    //             body: JSON.stringify({ email, password }),
    //         }
    //         const resp = await http('/auth/login', apiCallOptions)
    //         if (resp.ok) {
    //             const data = resp.json()
    //             console.log('data', data)
    //             return data
    //         }
    //     } catch (err) {
    //         console.log('login error: ', err)
    //     }
    // }

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    // const signIn = async (values) => {
    //     try {
    //         const resp = await logIn(values)
    //         console.log(resp)
    //         if (resp) {
    //             const { token } = resp
    //             dispatch(onSignInSuccess(token))
    //             if (resp.user) {
    //                 dispatch(
    //                     setUser(
    //                         resp.user || {
    //                             avatar: '',
    //                             userName: 'Anonymous',
    //                             authority: ['USER'],
    //                             email: '',
    //                         }
    //                     )
    //                 )
    //             }
    //             const redirectUrl = query.get(REDIRECT_URL_KEY)
    //             navigate(
    //                 redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
    //             )
    //             return {
    //                 status: 'success',
    //                 message: '',
    //             }
    //         }
    //     } catch (errors) {
    //         return {
    //             status: 'failed',
    //             message: errors?.response?.data?.message || errors.toString(),
    //         }
    //     }
    // }

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
