import React from 'react'
import './css/App.css'
import './css/stock_view.css'
import { AiOutlineFundView } from 'react-icons/ai'
import Quickstockview from './components/quickstockview'
import StockChart from './components/stock_chart'
//props.stock


function Stock_View(props) {
    return (
        <div className='stockviewbackground'>
            <div className='TopLogo'>
                <AiOutlineFundView size={110} className='header' />
                <h1 className='header'>Stock view</h1>
                <h3 className='header'> - {props.stock} -</h3>
            </div>
            <Quickstockview stock={props.stock} />
            <StockChart stock={props.stock} />
        </div>
    )
}

export default Stock_View