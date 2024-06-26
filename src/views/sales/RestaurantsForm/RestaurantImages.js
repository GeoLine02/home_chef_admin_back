import {
    AdaptableCard,
    ConfirmDialog,
    DoubleSidedImage,
} from 'components/shared'
import { Dialog, FormItem, Upload } from 'components/ui'
import { Field } from 'formik'
import React, { useState } from 'react'
import { HiEye, HiTrash } from 'react-icons/hi'

const ImageList = (props) => {
    const { img, onImageDelete } = props
    const [selectedImg, setSelectedImg] = useState({})
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const onViewOpen = (img) => {
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({})
        }, 300)
    }

    const onDeleteConfirmation = (img) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({})
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }
    return (
        <>
            <div
                className="group relative rounded border p-2 flex"
                key={img.id}
            >
                <img
                    className="rounded max-h-[140px] max-w-full"
                    src={img.img}
                    alt={img.name}
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                        onClick={() => onViewOpen(img)}
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                    >
                        <HiEye />
                    </span>
                    <span onClick={() => onDeleteConfirmation(img)}>
                        <HiTrash />
                    </span>
                </div>
            </div>

            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg.name}</h5>
                <img
                    className="w-full"
                    src={selectedImg.img}
                    alt={selectedImg.name}
                />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                type="danger"
                title="Remove image"
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
                confirmButtonColor="red-600"
            >
                <p> Are you sure you want to remove this image?</p>
            </ConfirmDialog>
        </>
    )
}

const RestaurantImages = (props) => {
    const { values, setSelectedImage } = props
    const beforeUpload = (file) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!'
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 500kb!'
            }
        }

        return valid
    }
    const onUpload = (form, field, files) => {
        let imageId = '1-img-0'
        setSelectedImage(files[0])
        const image = {
            id: imageId,
            name: files[0].name,
            img: URL.createObjectURL(files[0]),
        }
        form.setFieldValue(field.name, image)
    }
    const handleImageDelete = (form, field, deletedImg) => {
        form.setFieldValue(field.name, null)
    }
    return (
        <AdaptableCard>
            <h5>Restaurant Image</h5>
            <p className="mb-6">Add or Change image for the restaurant</p>
            <FormItem>
                <Field name="imgList">
                    {({ field, form }) => {
                        if (values.img) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <ImageList
                                        img={values.img}
                                        onImageDelete={(img) =>
                                            handleImageDelete(form, field, img)
                                        }
                                    />
                                    <Upload
                                        className="min-h-fit"
                                        beforeUpload={beforeUpload}
                                        onChange={(files) => {
                                            onUpload(form, field, files)
                                        }}
                                        showList={false}
                                        draggable
                                    >
                                        <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                                            <DoubleSidedImage
                                                src="/img/others/upload.png"
                                                darkModeSrc="/img/others/upload-dark.png"
                                            />
                                            <p className="font-semibold text-center text-gray-800 dark:text-white">
                                                Upload
                                            </p>
                                        </div>
                                    </Upload>
                                </div>
                            )
                        } else if (field.value) {
                            return (
                                <ImageList
                                    img={field.value}
                                    onImageDelete={(img) =>
                                        handleImageDelete(form, field, img)
                                    }
                                />
                            )
                        } else if (field.value) {
                            return (
                                <div>
                                    <ImageList
                                        img={field.value}
                                        onImageDelete={(img) =>
                                            handleImageDelete(form, field, img)
                                        }
                                    />
                                    <Upload
                                        className="min-h-fit"
                                        beforeUpload={beforeUpload}
                                        onChange={(files) => {
                                            onUpload(form, field, files)
                                        }}
                                        showList={false}
                                        draggable
                                    >
                                        <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                                            <DoubleSidedImage
                                                src="/img/others/upload.png"
                                                darkModeSrc="/img/others/upload-dark.png"
                                            />
                                            <p className="font-semibold text-center text-gray-800 dark:text-white">
                                                Upload
                                            </p>
                                        </div>
                                    </Upload>
                                </div>
                            )
                        } else {
                            return (
                                <Upload
                                    beforeUpload={beforeUpload}
                                    onChange={(files) =>
                                        onUpload(form, field, files)
                                    }
                                    showList={false}
                                    draggable
                                >
                                    <div className="my-16 text-center">
                                        <DoubleSidedImage
                                            className="mx-auto"
                                            src="/img/others/upload.png"
                                            darkModeSrc="/img/others/upload-dark.png"
                                        />
                                        <p className="font-semibold">
                                            <span className="text-gray-800 dark:text-white">
                                                Drop your image here, or{' '}
                                            </span>
                                            <span className="text-blue-500">
                                                browse
                                            </span>
                                        </p>
                                        <p className="mt-1 opacity-60 dark:text-white">
                                            Support: jpeg, png
                                        </p>
                                    </div>
                                </Upload>
                            )
                        }
                    }}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default RestaurantImages
