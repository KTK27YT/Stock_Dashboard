import React, { useRef, useEffect, useState } from 'react'
import { API_KEY } from '../config';
import '../css/stock_chart.css'
import * as d3 from "d3";

function StockChart(props) {
    const apikey = API_KEY;
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
            .attr("width", 1400)
            .attr("height", height)
            .style("z-index", 1)
            .append("g")
            .style('position', 'relative'); // Important for positioning

        const chartWrapper = body.append('div').style('position', 'relative');
        const svg = chartWrapper
            .append("svg")
            .attr("width", 1300)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Dummy Data
        // const dataset = [{
        //     "datetime": "2021-09-16 15:59:00",
        //     "open": "148.73500",
        //     "high": "148.86000",
        //     "low": "148.73000",
        //     "close": "148.85001",
        //     "volume": "624277"
        // },
        // {
        //     "datetime": "2021-09-16 15:58:00",
        //     "open": "148.72000",
        //     "high": "148.78000",
        //     "low": "148.70000",
        //     "close": "148.74001",
        //     "volume": "274622"
        // },
        // {
        //     "datetime": "2021-09-16 15:57:00",
        //     "open": "148.77499",
        //     "high": "148.79500",
        //     "low": "148.71001",
        //     "close": "148.72501",
        //     "volume": "254725"
        // },
        // {
        //     "datetime": "2021-09-16 15:56:00",
        //     "open": "148.76500",
        //     "high": "148.78999",
        //     "low": "148.72000",
        //     "close": "148.78000",
        //     "volume": "230758"
        // },
        // {
        //     "datetime": "2021-09-16 15:55:00",
        //     "open": "148.80000",
        //     "high": "148.80000",
        //     "low": "148.70000",
        //     "close": "148.76230",
        //     "volume": "348577"
        // }]

        // We make the API Call here
        // https://api.twelvedata.com/time_series?apikey=KEY&interval=1day&symbol=SYMBOL&format=JSON
        const url = "https://api.twelvedata.com/time_series?";
        fetch(url + "&apikey=" + apikey + "&symbol=" + props.stock + "&interval=1min&format=JSON")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const dataset = data.values;
                //Clean up dataset
                dataset.forEach(function (d) {
                    d.datetime = new Date(d.datetime);
                    d.open = +d.open;
                    d.high = +d.high;
                    d.low = +d.low;
                    d.close = +d.close;
                });

                // Sort the data by date
                dataset.sort((a, b) => a.datetime - b.datetime);

                // Define the x and y domains
                x.domain(d3.extent(dataset, function (d) { return d.datetime; }));
                y.domain([d3.min(dataset, function (d) { return d.open }), d3.max(dataset, function (d) { return d.high; })]);

                // Add the X axis (This removes the default line)
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .style("font-size", "14px")
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMinute.every(1))
                        .tickFormat(d3.timeFormat("%H:%M")))
                    .call(g => g.select(".domain").remove())
                    .selectAll(".tick line")
                    .style("stroke-opacity", 0)
                svg.selectAll(".tick text")
                    .style("fill", "white");

                // Add the Y Axis
                svg.append("g")
                    .style("font-size", "14px")
                    .call(d3.axisLeft(y)
                        .tickFormat(d3.format(".2f"))
                        .tickSize(0)
                        .tickPadding(10))
                    .call(g => g.select(".domain").remove())
                    .selectAll(".tick text")
                    .style("fill", "white");

                // Add Vertical Gridlines
                svg.selectAll("xGrid")
                    .data(x.ticks().slice(1))
                    .join("line")
                    .attr("x1", d => x(d))
                    .attr("x2", d => x(d))
                    .attr("y1", 0)
                    .attr("y2", height)
                    .attr("stroke", "#e0e0e0")
                    .attr("stroke-opacity", 0.1);

                // Add Horizontal Gridlines
                svg.selectAll("yGrid")
                    .data(y.ticks().slice(1))
                    .join("line")
                    .attr("x1", 0)
                    .attr("x2", width)
                    .attr("y1", d => y(d))
                    .attr("y2", d => y(d))
                    .attr("stroke", "#e0e0e0")
                    .attr("stroke-opacity", 0.1);


                // Create the line generator
                const closeline = d3.line()
                    .x(function (d) { return x(d.datetime); })
                    .y(function (d) { return y(d.close); });

                // Add the line
                svg.append("path")
                    .datum(dataset)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", closeline);

                const openline = d3.line()
                    .x(function (d) { return x(d.datetime); })
                    .y(function (d) { return y(d.open); });

                // Add the line
                svg.append("path")
                    .datum(dataset)
                    .attr("fill", "none")
                    .attr("stroke", "red")
                    .attr("stroke-width", 1.5)
                    .attr("d", openline);

                const highline = d3.line()
                    .x(function (d) { return x(d.datetime); })
                    .y(function (d) { return y(d.high); });

                // Add the line
                svg.append("path")
                    .datum(dataset)
                    .attr("fill", "none")
                    .attr("stroke", "green")
                    .attr("stroke-width", 1.5)
                    .attr("d", highline);

                // Add Legends
                var legend_keys = ["Close", "Open", "High"];
                const colDict = { Close: 'steelblue', Open: 'red', High: 'green' }
                var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
                    .enter().append("g")
                    .style("color", "white")
                    .attr("class", "lineLegend")
                    .attr("transform", function (d, i) {
                        return "translate(" + 40 + "," + (i * 20) + ")";
                    });

                lineLegend.append("text").text(function (d) { return d; })
                    .style("fill", "white")
                    .attr("transform", "translate(15,6)"); //align texts with boxes

                lineLegend.append("rect")
                    .style("fill-opacity", 100)
                    .attr("fill", d => colDict[d])
                    .attr("width", 12).attr('height', 5);

                // create the tooltip
                const tooltip = d3.select(chartRef.current).append("div").attr("class", "tooltip");

                // Add the Circle Element
                // TODO Change the fill to the signature colour of the page rgb(0, 200, 161)
                const circle = svg.append("circle")
                    .attr("r", 0)
                    .attr("fill", "steelblue")
                    .attr("stroke", "white")
                    .attr("opacity", .70)
                    .style("pointer-events", "none");

                // Add the listening rect
                const listeningRect = svg.append("rect")
                    .attr("width", width)
                    .attr("height", height)

                listeningRect.on("mousemove", function (event) {
                    const [xCoord, yCoord] = d3.pointer(event, this);
                    const bisectDate = d3.bisector((d) => d.datetime).left;
                    const x0 = x.invert(xCoord);
                    const i = bisectDate(dataset, x0, 1);
                    const d0 = dataset[i - 1];
                    const d1 = dataset[i];
                    const d = x0 - d0.datetime > d1.datetime - x0 ? d1 : d0;
                    const xPos = x(d.datetime);
                    const yPos = y(d.close);

                    // Update the circle position
                    circle.attr("cx", xPos).attr("cy", yPos);

                    // Add Transition to the circle
                    circle.transition()
                        .duration(50)
                        .attr("r", 5);

                    // Add in our tooltip
                    tooltip
                        .style("opacity", 1)
                        .style("left", xPos + 100 + "px")
                        .style("top", yPos + 400 + "px")
                        .style("display", "block")
                        .html("<strong> Date:</strong>" + d.datetime + "<p>Open: " + d.open + "</p>")
                    listeningRect.on("mouseleave", function () {
                        circle.transition()
                            .duration(50)
                            .attr("r", 0);
                        tooltip.style("opacity", 0);
                    });

                })
            })

    }, []);

    return (
        <div id="chart-container" ref={chartRef}>

        </div>

    )
}

export default StockChart