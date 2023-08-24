
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
            fetch(url + "GSPC" + "&apikey=" + apikey)
                .then(response => response.json())
                .then(data => {
                    setEod(data);
                    console.log(data);
                })
            setIndiceName("S&P 500");
        }
        else if (props.index === "DJIA") {
            setIndiceName("Dow Jones Industrial Average");
            fetch(url + "DJIA" + "&apikey=" + apikey)
                .then(response => response.json())
                .then(data => {
                    setEod(data);
                    console.log(data);
                })
        }
        else if (props.index === "IXIC") {
            setIndiceName("NASDAQ Composite");
            fetch(url + "IXIC" + "&apikey=" + apikey)
                .then(response => response.json())
                .then(data => {
                    setEod(data);
                    console.log(data);
                })
        }
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