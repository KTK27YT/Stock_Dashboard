import React, { useEffect, useState } from 'react'
import './search.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Search(props) {

    return (
        <div className='search_btn'>
            <button type='search' onClick={props.change}><AiOutlineSearch size={20} /></button>
        </div>
    )
}

export default Search