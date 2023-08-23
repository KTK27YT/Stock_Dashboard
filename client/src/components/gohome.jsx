import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import '../css/gohome.css'
function GoHome(props) {
    return (
        <div className='home'>
            <button type='search' onClick={props.homescrnfunc}><AiOutlineHome size={20} /></button>
        </div>
    )
}

export default GoHome