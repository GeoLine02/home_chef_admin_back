import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import {
    deleteRestaurant,
    getRestaurantList,
    deleteRestaurantByID,
} from '../store/dataSlice'
import { Notification, toast } from 'components/ui'
import { ConfirmDialog } from 'components/shared'

const RestaurantDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.salesRestaurantList.state.deleteConfirmation
    )
    const selectedRestaurant = useSelector(
        (state) => state.salesRestaurantList.state.selectedRestaurant
    )
    const tableData = useSelector(
        (state) => state.salesRestaurantList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = () => {
        const success = dispatch(deleteRestaurant(selectedRestaurant))
        dispatch(toggleDeleteConfirmation(false))
        dispatch(deleteRestaurantByID(selectedRestaurant))
        if (success) {
            dispatch(getRestaurantList(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Restaurant successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }
    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete Restaurant"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this restaurant? All record
                related to this restaurant will be deleted as well. This action
                cannot be undone.
            </p>
        </ConfirmDialog>
    )
}

export default RestaurantDeleteConfirmation
