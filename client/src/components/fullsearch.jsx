import React, { useState, useEffect } from "react";
import "./fullsearch.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Animated } from "react-animated-css";
function Fullsearch(props) {
    const [indiceList, setIndiceList] = useState();
    const [stockList, setStockList] = useState();
    const [searchList, setSearchList] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    useEffect(() => {
        const stockurl = `https://api.twelvedata.com/stocks`;
        const indiceurl = `https://api.twelvedata.com/indices`;
        fetch(stockurl)
            .then(response => response.json())
            .then(data => {
                const stockList = data.data.map((stock) => stock.symbol);
                console.log("Working on stocklist");
                setStockList(stockList);
            })
        fetch(indiceurl)
            .then(response => response.json())
            .then(data => {
                const indiceList = data.data.map((indice) => indice.symbol);
                console.log("Working on indicelist");
                setIndiceList(indiceList);
            })

    }, []);
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
        if (searchTerm.length > 2) {
            const results = stockList.filter((stock) => stock.toLowerCase().includes(searchTerm.toLowerCase()));
            setSuggestions(results.slice(0, 10));
            console.log(suggestions);
            setShowSuggestions(true);
        }
    }
    return (
        <Animated className='spotlight_wrapper' animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
            <div className="spotlight_wrapper">
                <button className="close_btn" onClick={props.toggle}><AiOutlineCloseCircle size={60} /></button>
                <input type='text' className="spotlight" placeholder='Search' value={searchTerm} onChange={handleChange} />
                {showSuggestions ? <Animated className='suggestions' animationIn="FadeIn" animationOut="fadeOut" isVisible={true}>
                    <div className='suggestions'>
                        {suggestions.map((suggestion, index) => {
                            return <div onClick={(e) => setSearchTerm(e.target.outerText)} value={suggestion} className="suggestion-row" key={index}>{suggestion}</div>
                        })}
                        <div className="submit_btn">Submit</div>
                    </div>
                </Animated> : null}
            </div>
        </Animated>
    )
}

export default Fullsearch;