import { Button, Checkbox, FormContainer, Select } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import React, { forwardRef, useState } from 'react'
import RestaurantInformationFields from '../RestaurantNew/RestaurantInformationFields'
import * as Yup from 'yup'
import { AiOutlineSave } from 'react-icons/ai'
import { AdaptableCard, ConfirmDialog, StickyFooter } from 'components/shared'
import RestaurantImages from './RestaurantImages'
import { HiOutlineTrash } from 'react-icons/hi'
import weekDays from 'constants/weekDays.constant'
import TimeInputRange from 'components/ui/TimeInput/TimeInputRange'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Restaurant Name Required'),
    ownerId: Yup.number().required('Owner id Required'),
    address: Yup.string().required('Address Required'),
    city: Yup.string().required('City Required'),
    email: Yup.string().required('Email Required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must only contain digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must not exceed 15 digits')
        .required('Phone number is required'),
})

const DeleteRestaurantButton = ({ onDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                type="danger"
                title="Delete product"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this restaurant? All record
                    related to this restaurant will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const RestaurantForm = forwardRef((props, ref) => {
    const { type, onDelete, initialData, onFormSubmit } = props
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    ...initialData,
                }}
                innerRef={ref}
                onSubmit={(values, { setSubmitting }) => {
                    onFormSubmit(values, selectedImage, initialData?.id)
                    setSubmitting()
                }}
            >
                {({ values, touched, errors, isSubmitting, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">
                                <div className="lg:col-span-2 lg:row-span-2">
                                    <RestaurantInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <RestaurantImages
                                        setSelectedImage={setSelectedImage}
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div>
                                    <AdaptableCard>
                                        <div>
                                            <h5>Working Days</h5>
                                            <Field name="workingDays">
                                                {({ field, form }) => (
                                                    <Select
                                                        className="min-w-[250px]"
                                                        isMulti={true}
                                                        field={field}
                                                        form={form}
                                                        options={weekDays}
                                                        placeholder={
                                                            'Pick working days'
                                                        }
                                                        value={values.select}
                                                        onChange={(
                                                            selectedOptions
                                                        ) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                selectedOptions.map(
                                                                    (option) =>
                                                                        option.label
                                                                )
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>

                                            <Checkbox className="my-3">
                                                Every day
                                            </Checkbox>

                                            <div>
                                                <h5 className="my-2">
                                                    Working Hours
                                                </h5>
                                                <Field name="workingHours">
                                                    {({ field, form }) => (
                                                        <TimeInputRange
                                                            field={field}
                                                            form={form}
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                    </AdaptableCard>
                                </div>
                            </div>

                            <StickyFooter
                                className="px-8 flex items-center justify-beetwen py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark: border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteRestaurantButton
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        Discard
                                    </Button>

                                    {type === 'edit' ? (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            loading={isSubmitting}
                                            icon={<AiOutlineSave />}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            loading={isSubmitting}
                                            icon={<AiOutlineSave />}
                                            type="submit"
                                        >
                                            Create
                                        </Button>
                                    )}
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

RestaurantForm.defaultProps = {
    type: 'edit',
    initialData: {
        name: '',
        address: '',
        city: '',
        phoneNumber: '',
        email: '',
        img: '',
        imgList: null,
        workingDays: [],
    },
}

export default RestaurantForm
