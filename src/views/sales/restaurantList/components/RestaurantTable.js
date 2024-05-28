import { Avatar } from 'components/ui'
import React, { useEffect, useMemo, useRef } from 'react'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useThemeClass from 'utils/hooks/useThemeClass'
// import { toggleDeleteConfirmation } from 'views/sales/ProductList/store/stateSlice'
import { getRestaurantList, setTableData } from '../store/dataSlice'
import { cloneDeep } from 'lodash'
import { DataTable } from 'components/shared'
import { BiBuilding } from 'react-icons/bi'
import {
    setSelectedRestaurant,
    toggleDeleteConfirmation,
} from '../store/stateSlice'
import RestaurantDeleteConfirmation from './RestaurantDeleteConfirmation'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/sales/restaurant-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedRestaurant(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const RestaurantColumn = ({ row }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<BiBuilding />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const RestaurantTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesRestaurantList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesRestaurantList.data.filterData
    )

    const loading = useSelector(
        (state) => state.salesRestaurantList.data.loading
    )

    const data = useSelector(
        (state) => state.salesRestaurantList.data.restaurantList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getRestaurantList())
    }

    const columns = useMemo(
        () => [
            {
                header: 'id',
                accessorKey: 'id',
            },
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <RestaurantColumn row={row} />
                },
            },
            {
                header: 'OwnerId',
                accessorKey: 'ownerId',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <RestaurantColumn row={row.ownerId} />
                // },
            },
            {
                header: 'PhoneNumber',
                accessorKey: 'phoneNumber',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <RestaurantColumn row={row.phoneNumber} />
                // },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )
    // const onPaginationChange = (page) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }

    // const onSelectChange = (value) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }

    // const onSort = (sort, sortingColumn) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                // onPaginationChange={onPaginationChange}
                // onSelectChange={onSelectChange}
                // onSort={onSort}
            />
            <RestaurantDeleteConfirmation />
        </>
    )
}

export default RestaurantTable
