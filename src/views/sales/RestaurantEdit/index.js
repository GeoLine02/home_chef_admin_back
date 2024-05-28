import { injectReducer } from 'store/index'
import reducer from './store'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantById } from './store/dataSlice'
import { useEffect } from 'react'
import { Loading } from 'components/shared'
import RestaurantForm from '../RestaurantsForm'
import { isEmpty } from 'lodash'
import { useLocation } from 'react-router-dom'
import { http } from 'utils/http'

injectReducer('salesRestaurantEdit', reducer)

const RestaurantEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()

    const restaurantData = useSelector(
        (state) => state.salesRestaurantEdit.data.restaurantData
    )
    const loading = useSelector(
        (state) => state.salesRestaurantEdit.data.laoding
    )

    const fetchData = (restaurantID) => {
        dispatch(getRestaurantById(restaurantID))
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const requestParam = { id: path }
        fetchData(requestParam.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const onRestaurantSave = async (values, selectedImage, restaurantID) => {
        try {
            const formData = new FormData()
            const apiCallOptions = {
                method: 'PUT',
                body: formData,
            }
            formData.append('name', values.name)
            formData.append('address', values.address)
            formData.append('city', values.city)
            formData.append('email', values.email)
            formData.append('phoneNumber', values.phoneNumber)
            formData.append('ownerId', values.ownerId)
            if (selectedImage) {
                formData.append('img', selectedImage)
                formData.append('filename', 'img')
            }
            formData.append('workingDays', values.workingDays)

            const resp = await http(
                `/restaurant/update/${restaurantID}`,
                apiCallOptions
            )
            if (resp.ok) {
                const data = await resp.json()
                return data
            }
        } catch (error) {
            console.log('Restaurant saving error:', error)
        }
    }

    return (
        <>
            <Loading loading={loading}>
                <>
                    {!isEmpty(restaurantData) && (
                        <>
                            <RestaurantForm
                                type="edit"
                                initialData={restaurantData}
                                onFormSubmit={onRestaurantSave}
                            />
                        </>
                    )}
                </>
            </Loading>
        </>
    )
}

export default RestaurantEdit
