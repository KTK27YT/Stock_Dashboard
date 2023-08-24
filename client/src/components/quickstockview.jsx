
import React, { useEffect, useState } from 'react'
import '../css/quickstockview.css'
import { API_KEY } from '../config';
const apikey = API_KEY;
const url = "https://api.twelvedata.com/eod?symbol="
//https://api.twelvedata.com/eod?symbol=AAPL&apikey=your_api_key
function Quickstockview(props) {
    const [eod, setEod] = useState([]);
    useEffect(() => {
        setEod({
            "symbol": "IXIC",
            "exchange": "NASDAQ",
            "mic_code": "XNGS",
            "currency": "USD",
            "datetime": "2023-08-11",
            "timestamp": 1691783959,
            "close": "13644.84961"
        });
        const data = {
            "symbol": "IXIC",
            "exchange": "NASDAQ",
            "mic_code": "XNGS",
            "currency": "USD",
            "datetime": "2023-08-11",
            "timestamp": 1691783959,
            "close": "13644.84961"
        };
        props.setCurrency(data.currency);
        // fetch(url + "DJIA" + "&apikey=" + apikey)
        //     .then(response => response.json())
        //     .then(data => {
        //         setEod(data);
        //         console.log(data);
        //     })
    }, []);
    return (
        <div className='stockinfo'>
            <div class='stock'>
                <h2>{props.stock}</h2>
                <h2>{eod.exchange} {eod.mic_code}</h2>
            </div>
            <div class='close'>
                <h2>Close</h2>
                <h2>{eod.currency} {parseFloat(eod.close).toFixed(2)}</h2>
            </div>
            <div class="timestamp">
                <h2>Timestamp</h2>
                <h2>{eod.datetime}</h2>
            </div>

        </div>
    )
}

export default Quickstockview