import { useState } from 'react'
import './App.css'
import { MenuBar } from './components'
import { Main } from './pages'

function App() {

  return (
    <div id="app" className="app">
      <div className="app__menu-bar">
        <MenuBar />
      </div>
      {/* <div className="app__content">
        <Main />
      </div> */}
    </div>
  )
}

export default App
