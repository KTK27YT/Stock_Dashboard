import React, { useEffect, useState } from 'react'
import '../css/quickstockview.css'
const apikey = "db575e6498614445b5b15465b45686dc";
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