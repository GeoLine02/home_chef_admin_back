import React from 'react'
import RestaurantForm from '../RestaurantsForm'
import { http } from 'utils/http'
const RestaurantNew = () => {
    const handleCreateRestaurant = async (
        values,
        selectedImage,
        setSubmitting
    ) => {
        try {
            const formData = new FormData()
            const apiCallOptions = {
                method: 'POST',
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
            const resp = await http('/restaurant/add', apiCallOptions)
            if (resp.ok) {
                const data = await resp.json()
                setSubmitting(true)
                return data
            }
        } catch (error) {
            console.log('Restaurant creating error:', error)
        }
    }

    return (
        <div>
            <RestaurantForm type="new" onFormSubmit={handleCreateRestaurant} />
        </div>
    )
}

export default RestaurantNew
