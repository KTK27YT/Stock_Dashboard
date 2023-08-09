import React, { Component } from 'react'
import Chart from '@qognicafinance/react-lightweight-charts'


import "./indices.css"

const aggregates = {
    "ticker": "I:NDX",
    "queryCount": 1,
    "results": [
        {
            "o": 12001.69552583921,
            "c": 11830.28178808306,
            "h": 12069.62262033557,
            "l": 11789.85923449393,
            "t": 1678428000000
        }
    ],
    "status": "OK",
    "request_id": "db6571e139ba82e7698545fbdad3ebc9",
    "count": 1
}

const past_NDX_data = "";

export class indices extends Component {
    render() {
        return (
            <div>
                Indices
                {past_NDX_data}
            </div>
        )
    }
}

export default indices