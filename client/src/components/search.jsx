import React from 'react'
import './search.css'
import { AiOutlineSearch } from 'react-icons/ai'
/*

this is to act as a search field for the user, so the user can search their stocks
using etiher ticker symbols or regular names

the 


*/



function Search() {
    return (
        <div className='search'>
            <input type='text' placeholder='Search' />
            <button type='submit'><AiOutlineSearch size={20} /></button>

        </div>

    )
}

export default Search