import React, { useEffect, useState } from 'react'
import '../css/App.css'
import '../css/stock_view.css'
import '../css/stock_chart.css'
const d3 = import("d3");
function StockChart(props) {

    const [stock, setStock] = useState(props.stock);
    const [timeSeries, setTimeSeries] = useState();
    useEffect(() => {
        const timedata = {
            "meta": {
                "symbol": "AAPL",
                "interval": "1min",
                "currency": "USD",
                "exchange_timezone": "America/New_York",
                "exchange": "NASDAQ",
                "mic_code": "XNAS",
                "type": "Common Stock"
            },
            "values": [
                {
                    "datetime": "2021-09-16 15:59:00",
                    "open": "148.73500",
                    "high": "148.86000",
                    "low": "148.73000",
                    "close": "148.85001",
                    "volume": "624277"
                },
                {
                    "datetime": "2021-09-16 15:58:00",
                    "open": "148.72000",
                    "high": "148.78000",
                    "low": "148.70000",
                    "close": "148.74001",
                    "volume": "274622"
                },
                {
                    "datetime": "2021-09-16 15:57:00",
                    "open": "148.77499",
                    "high": "148.79500",
                    "low": "148.71001",
                    "close": "148.72501",
                    "volume": "254725"
                },
                {
                    "datetime": "2021-09-16 15:56:00",
                    "open": "148.76500",
                    "high": "148.78999",
                    "low": "148.72000",
                    "close": "148.78000",
                    "volume": "230758"
                },
                {
                    "datetime": "2021-09-16 15:55:00",
                    "open": "148.80000",
                    "high": "148.80000",
                    "low": "148.70000",
                    "close": "148.76230",
                    "volume": "348577"
                }
            ],
            "status": "ok"
        }
        setTimeSeries(timedata.values)

    }, [])
    return (
        <div class="Chart">
            {stock}
            <br></br>
            <div class="chart-container">

            </div>
        </div>
    )
}

export default StockChart