import React, { useState } from 'react'
import './css/App.css'
import './css/stock_view.css'
import { AiOutlineFundView } from 'react-icons/ai'
import Quickstockview from './components/quickstockview'
import StockChart from './components/stock_chart'
import { Animated } from "react-animated-css";
import GoHome from './components/gohome'
//props.stock


function Stock_View(props) {
    const [currency, setCurrencyState] = useState("");

    function setCurrency(value) {
        setCurrencyState(value);
    }
    return (
        <div>
            <Animated className='stockviewbackground' animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                <div>
                    <div className='TopLogo'>
                        <AiOutlineFundView size={110} className='header' />
                        <h1 className='header'>Stock view</h1>
                        <h3 className='header'> - {props.stock} -</h3>
                    </div>
                    <Quickstockview setCurrency={setCurrency} stock={props.stock} />
                    <GoHome homescrnfunc={props.homescrnfunc} />
                </div>
            </Animated >

            <StockChart currency={currency} stock={props.stock} />
        </div>
    )
}

export default Stock_View