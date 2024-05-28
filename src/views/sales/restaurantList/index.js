import React from 'react'
import { AdaptableCard } from 'components/shared'
import reducer from './store'
import RestaurantTableTools from './components/RestaurantTableTools'
import { injectReducer } from 'store'
import RestaurantTable from './components/RestaurantTable'

injectReducer('salesRestaurantList', reducer)

const RestaurantList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Restaurants</h3>
                <RestaurantTableTools />
            </div>
            <RestaurantTable />
        </AdaptableCard>
    )
}

export default RestaurantList
