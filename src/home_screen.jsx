import React, { useEffect, useState } from 'react'
import { restClient } from '@polygon.io/client-js';
import './css/App.css'
import Search from './components/search';
import { AiOutlineArrowDown, AiOutlineStock } from 'react-icons/ai'
import Quickindexview from './components/quickindexview';
import Fullsearch from './components/fullsearch';
import { Animated } from "react-animated-css";
function Home_Screen(props) {
    const [fullSearch, setFullSearch] = useState(false);
    const [backendData, setBackendData] = useState([]);
    const rest = restClient("p3sYZ50gEhAqNzyRAesn5unTKWM94uQk");

    function toggleFullSearch() {
        setFullSearch(!fullSearch);
    }
    useEffect(() => {

    }, []);
    function submit_handler(value) {
        toggleFullSearch();
        props.searchhandler(value);
    }
    return (
        <Animated className='background' animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
            <div className='Logo'>
                <AiOutlineStock size={150} style={{ 'color': 'rgb(0, 200, 161)' }} />
                <h1 className='header '>Stock Dashboard</h1>
            </div>
            <Search change={toggleFullSearch} />
            {fullSearch ? <Fullsearch toggle={toggleFullSearch} submithandle={submit_handler} /> : null}
            <p style={{ color: "rgb(0, 200, 161)", marginTop: "35px" }}><AiOutlineArrowDown size={20} /></p>
            <Quickindexview index={"GSPC"} />
            <Quickindexview index={"DJIA"} />
            <Quickindexview index={"IXIC"} />
        </Animated>
    )
}

export default Home_Screen