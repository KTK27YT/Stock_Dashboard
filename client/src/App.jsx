import React, { useState } from 'react'
import './css/App.css'
import Stock_View from './Stock_View';
import Home_Screen from './home_screen';
function App() {
  const [ViewStock, setViewStock] = useState(false);
  const [searchvalue, setSearchValue] = useState("");
  const [homeScreen, setHomeScreen] = useState(true);
  function search_submit(value) {
    toggleHomeScreen();
    setSearchValue(value);
    setViewStock(true);
  }
  function toggleHomeScreen() {
    setHomeScreen(!homeScreen);
  }
  return (
    <div className='background'>
      {ViewStock ? <Stock_View stock={searchvalue} /> : null}
      {homeScreen ? <Home_Screen searchhandler={search_submit} /> : null}
    </div>
  )
}

export default App