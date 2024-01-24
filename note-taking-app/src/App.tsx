import { useState, createContext } from 'react'
import './App.css'
import { MenuBar } from './components'
import { Main } from './pages'
import { NoteInfo } from '@types'

export const NoteContext = createContext({} as { currentNote: NoteInfo, setCurrentNote: (note: NoteInfo) => void })

function App() {

  const [currentNote, setCurrentNote] = useState({} as NoteInfo)

  return (
    <NoteContext.Provider value={{ currentNote, setCurrentNote }}>
    <div id="app" className="app">
      <div className="app__menu-bar">
        <MenuBar />
      </div>
      <div className="app__content">
        <Main />
      </div>
    </div>
    </NoteContext.Provider>
  )
}

export default App
