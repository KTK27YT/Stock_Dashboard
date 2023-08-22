import React, { useRef, useEffect, useState } from 'react'
import '../css/stock_chart.css'
import * as d3 from "d3";

function StockChart(props) {

    const chartRef = useRef();
    const [stock, setStock] = useState(props.stock);
    const [timeSeries, setTimeSeries] = useState();

    useEffect(() => {
        const margin = { top: 70, right: 30, bottom: 40, left: 80 };
        const width = 1200 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Define axis
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        const parent = d3.select(chartRef.current);
        parent.selectAll("*").remove();

        const body = parent
            .append('div')
            .style('overflow-x', 'scroll')
            .style('-webkit-overflow-scrolling', 'touch')
            .style('position', 'relative'); // Important for positioning
        // Create the svg with the vertical axis. 
        parent.append('svg')
            .attr("width", width)
            .attr("height", height)
            .style("z-index", 1)
            .append("g")
            .style('position', 'relative'); // Important for positioning

        const chartWrapper = body.append('div').style('position', 'relative');
        const svg = chartWrapper
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Fake AF data
        const dataset = [{
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
        }]

        //Clean up dataset
        dataset.forEach(function (d) {
            d.datetime = new Date(d.datetime);
        });

        // Define the x and y domains
        x.domain(d3.extent(dataset, function (d) { return d.datetime; }));
        y.domain([d3.min(dataset, function (d) { return d.close }), d3.max(dataset, function (d) { return d.close; })]);

        // add the X axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .ticks(d3.timeMinute.every(1))
                .tickFormat(d3.timeFormat("%d %b %Y %H:%M")));

        // add the Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Create the line generator
        const line = d3.line()
            .x(function (d) { return x(d.datetime); })
            .y(function (d) { return y(d.close); });

        // Add the line
        svg.append("path")
            .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }, []);

    return (
        <div id="chart-container" ref={chartRef}>

        </div>

    )
}

export default StockChart