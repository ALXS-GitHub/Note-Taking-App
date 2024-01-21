import React from 'react';

import './MenuBar.scss';

function MenuBar() {

    function openSettings() {
        // TODO: open settings
    }

    function minimizeApp() {
        window.ipcRenderer.send('minimizeApp')
    }

    function maximizeApp() {
        window.ipcRenderer.send('maximizeApp')
    }

    function closeApp() {
        window.ipcRenderer.send('closeApp')
        console.log('closeApp')
    }
    
  return (
    <div id="menu-bar" className="menu-bar draggable-area">
        <div className="menu-bar__left">
            <div className="menu-bar__logo">
                <img src="/app-logo-white.png" alt="app-logo-white" className="menu-bar__logo__img" />
            </div>
            <div className="menu-bar__title">
                Note Taking App
            </div>
        </div>
        <div className="menu-bar__right">
            <button className="non-draggable" onClick={openSettings}>⚙️</button>
            <button className="non-draggable" onClick={minimizeApp}>─</button>
            <button className="non-draggable" onClick={maximizeApp}>□</button>
            <button className="non-draggable" onClick={closeApp}>X</button>
        </div>
        
    </div>
  )
}

export default MenuBar