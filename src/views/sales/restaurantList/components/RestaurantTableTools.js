import React from 'react'
import RestaurantTableSearch from './RestaurantTableSearch'
import { Link } from 'react-router-dom'
import { Button } from 'components/ui'
import { HiDownload } from 'react-icons/hi'

const RestaurantTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <RestaurantTableSearch />
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/sales/restaurant-new"
            >
                <Button>Add Restaurant</Button>
            </Link>
        </div>
    )
}

export default RestaurantTableTools
