import { AdaptableCard } from 'components/shared'
import { FormItem, Input } from 'components/ui'
import { Field } from 'formik'
import React from 'react'

const RestaurantInformationFields = (props) => {
    const { touched, errors } = props
    return (
        <AdaptableCard className="mb-4">
            <h5>Restaurant Information</h5>
            <p className="mb-6">
                Section to config basic restaurant information
            </p>
            <FormItem
                label="Restaurant Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="OwnerId"
                invalid={errors.ownerId && touched.ownerId}
                errorMessage={errors.ownerId}
            >
                <Field
                    type="numeric"
                    autoComplete="off"
                    name="ownerId"
                    placeholder="Owner Id"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="address"
                invalid={errors.address && touched.address}
                errorMessage={errors.address}
            >
                <Field
                    type="text"
                    name="address"
                    autoComplete="off"
                    placeholder="Address"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="city"
                autoComplete="off"
                invalid={errors.city && touched.city}
                errorMessage={errors.city}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="city"
                    placeholder="City"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="email"
                autoComplete="off"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="phoneNumber"
                autoComplete="off"
                invalid={errors.phoneNumber && touched.phoneNumber}
                errorMessage={errors.phoneNumber}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phoneNumber"
                    placeholder="phone Number"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default RestaurantInformationFields
