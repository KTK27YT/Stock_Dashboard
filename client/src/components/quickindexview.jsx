
import React, { Component, useState, useEffect } from 'react'
import '../css/quickindexview.css';
import $ from 'jquery';
import { API_KEY } from '../config';
const apikey = API_KEY;
const url = "https://api.twelvedata.com/eod?symbol="


function Quickindexview(props) {
    const [eod, setEod] = useState([]);
    const [indicename, setIndiceName] = useState([]);
    useEffect(() => {
        if (props.index === "GSPC") {
            setIndiceName("S&P 500");
            setEod({
                "symbol": "GSPC",
                "exchange": "NYSE",
                "mic_code": "XNYS",
                "currency": "USD",
                "datetime": "2023-08-11",
                "timestamp": 1691783998,
                "close": "4464.04980"
            });
        }
        else if (props.index === "DJIA") {
            setIndiceName("Dow Jones Industrial Average");
            setEod({
                "symbol": "DJIA",
                "exchange": "NYSE",
                "close": "22.32000",
                "currency": "USD",
                "datetime": "2023-08-11",
                "exchange": "NYSE",
                "mic_code": "ARCX",
                "timestamp": 1691783990
            });
        }
        else if (props.index === "IXIC") {
            setIndiceName("NASDAQ Composite");
            setEod({
                "symbol": "IXIC",
                "exchange": "NASDAQ",
                "mic_code": "XNGS",
                "currency": "USD",
                "datetime": "2023-08-11",
                "timestamp": 1691783959,
                "close": "13644.84961"
            });
        }
        // fetch(url + "DJIA" + "&apikey=" + apikey)
        //     .then(response => response.json())
        //     .then(data => {
        //         setEod(data);
        //         console.log(data);
        //     })
        var breakAt = 4; //breaks at 4 characters
        var brokenString = $("#breakline").html();
        brokenString = brokenString.substring(0, breakAt) + "<br>" + brokenString.substring(breakAt);
        $("#breakline").html(brokenString);
    }, []);

    return (
        <div className='indiceview'>
            <div className='indiceName'>
                <h2 id='breakline'>{indicename}</h2>
                <p>{eod.exchange}</p>
            </div>
            <div className='indiceClose'>
                <h2 style={{ "color": "rgb(0, 200, 161)" }}>CLOSE</h2>
                <h2>{eod.currency} {parseFloat(eod.close).toFixed(2)}</h2>
            </div>
        </div>
    )
}

export default Quickindexview