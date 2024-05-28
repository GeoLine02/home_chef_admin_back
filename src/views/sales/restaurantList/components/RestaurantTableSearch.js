import { cloneDeep, debounce } from 'lodash'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getRestaurantList,
    searchRestaurant,
    setTableData,
} from '../store/dataSlice'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'

const RestaurantTableSearch = () => {
    const dispatch = useDispatch()
    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.salesRestaurantList.data.tableData
    )
    console.log('query', tableData.query)

    // const debounceFn = debounce(handleDebounceFn, 500)

    // function handleDebounceFn(val) {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.query = val
    //     newTableData.pageIndex = 1
    //     fetchData(tableData)
    //     // if (tableData.query.length > 1) {
    //     //     fetchData(tableData)
    //     // }

    //     // if (tableData.query.length === 0) {
    //     //     fetchData(tableData)
    //     // }
    // }

    const fetchData = (data) => {
        if (data.length === 0) {
            dispatch(getRestaurantList())
        } else {
            dispatch(searchRestaurant(data))
        }
    }

    const onEdit = (e) => {
        console.log('event', e.target.value)
        fetchData(e.target.value)
        dispatch(setTableData({ ...tableData, query: e.target.value }))
    }
    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search restaurant"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default RestaurantTableSearch
