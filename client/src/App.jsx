import React, { useEffect, useState } from 'react'
import { restClient } from '@polygon.io/client-js';
import './App.css';
import Search from './components/search';
import Indices from './components/indices';
import { AiOutlineArrowDown } from 'react-icons/ai'
import Quickindexview from './components/quickindexview';
function App() {

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

  return (
    <div className='background'>
      <h1 className='header'>Search a stock </h1>
      <Search />

      <p style={{ color: "rgb(0, 200, 161)", marginTop: "35px" }}><AiOutlineArrowDown size={20} /></p>
      {/* <Indices /> */}
      <Quickindexview index={"GSPC"} />
      <Quickindexview index={"DJIA"} />
      <Quickindexview index={"IXIC"} />
    </div>
  )
}

export default App