import React, { Component } from 'react'

import snp500data from './snp500data';
import "./indices.css"
import responsivefy from '../functions/responsivefy';
/* take the data from snp500data and create a chart with it 
using d3.js it will be done inside the div with class chart-container
*/
const data = snp500data;
var d3 = require("d3");



export class indices extends Component {
    componentDidMount() {
        var svg = d3.select("#chart").append("svg").attr("viewbox", "0 0 1920 1080");
        // set Dimensions and margins for the chart
        const margin = { top: 0, right: 20, bottom: 20, left: 30 };
        const width = 1920;
        const height = 1080;
        // set up the x and y scales
        const dataset = snp500data.values;
        const parseddataset = dataset.map(d => {
            return {
                datetime: new Date(d.datetime),
                open: d.open,
                high: d.high,
                low: d.low,
                close: d.close,
                volume: d.volume
            };
        });
        console.log(parseddataset);
        const x = d3.scaleTime().range([0, width - margin.left - margin.right]);
        const y = d3.scaleLinear().range([height, 0 - margin.top - margin.bottom]);
        // create the SVG element and append it to the chart container
        svg
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .append("g");


        // Take out the values from the SNP dataset

        // define the x and y domains
        x.domain(d3.extent(parseddataset, function (d) { return d.datetime; }));
        console.log(d3.min(parseddataset, function (d) { return d.close; }));
        console.log(d3.max(parseddataset, function (d) { return d.close; }));
        y.domain([500, d3.max(parseddataset, function (d) { return Math.round(d.close); })]);
        // Add the x-axis
        svg.append("g")
            // .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1))
                .tickFormat(d3.timeFormat("%b %Y")));
        // Add the y-axis
        svg.append("g")
            .call(d3.axisLeft(y));
        // create the line generator
        const line = d3.line()
            .x(function (d) { return x(d.datetime); })
            .y(function (d) { return y(d.close); });
        // Add the line path to the svg element
        svg.append("path")
            .datum(parseddataset)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line)
            .call(responsivefy);
        // Responsivefy function

    };
    render() {
        return (
            <div className='chart-container'>
                <svg id="chart">

                </svg>
            </div>
        )
    }

}

export default indices