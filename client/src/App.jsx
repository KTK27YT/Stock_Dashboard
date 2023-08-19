import React, { useEffect, useState } from 'react'
import { restClient } from '@polygon.io/client-js';
import './App.css';
import Search from './components/search';
import Indices from './components/indices';
import { AiOutlineArrowDown, AiOutlineStock } from 'react-icons/ai'
import Quickindexview from './components/quickindexview';
import Fullsearch from './components/fullsearch';
import { Animated } from "react-animated-css";
function App() {
  const [fullSearch, setFullSearch] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const rest = restClient("p3sYZ50gEhAqNzyRAesn5unTKWM94uQk");
  useEffect(() => {
    // rest.stocks.aggregates("AAPL", 1, "day", "2023-01-01", "2023-04-14").then((data) => {
    //   console.log(data);
    //   setBackendData(data);
    // }).catch(e => {
    //   console.error('An error happened:', e);
    //   setBackendData(e);
    // });
    const storeddata_closed_appl = {
      "status": "OK",
      "from": "2023-01-09",
      "symbol": "AAPL",
      "open": 130.465,
      "high": 133.41,
      "low": 129.89,
      "close": 130.15,
      "volume": 70790813,
      "afterHours": 129.85,
      "preMarket": 129.6
    };
    setBackendData(storeddata_closed_appl);
  }, []);
  function toggleFullSearch() {
    setFullSearch(!fullSearch);
  }
  return (
    <div className='background'>
      <Animated className='background' animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
        <div className='Logo'>
          <AiOutlineStock size={150} style={{ 'color': 'rgb(0, 200, 161)' }} />

          <h1 className='header '>Stock Dashboard</h1>
        </div>
        <Search change={toggleFullSearch} />
        {fullSearch ? <Fullsearch toggle={toggleFullSearch} /> : null}
        <p style={{ color: "rgb(0, 200, 161)", marginTop: "35px" }}><AiOutlineArrowDown size={20} /></p>
        {/* <Indices /> */}
        <Quickindexview index={"GSPC"} />
        <Quickindexview index={"DJIA"} />
        <Quickindexview index={"IXIC"} />
      </Animated>
    </div>
  )
}

export default App