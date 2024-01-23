/* eslint-disable */
import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(__dirname, '../src/db/notes.db');
const db = new sqlite3.Database(dbPath, (err: any) => {
    console.log("Connected to the notes database.");
    db.serialize(() => {
        db.run(
            "CREATE TABLE IF NOT EXISTS notes (id STRING PRIMARY KEY, title TEXT , content TEXT, lastModified TEXT, isActive INTEGER, isPinned INTEGER, color TEXT)"
        );
        console.log("DataBase successfully started!");
    });
});

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
        width: 1200,
        height: 800,
        title: "Note Taking App",
        frame: false,
        resizable: true,
        // titleBarStyle: 'hidden', // todo : uncomment this when the app will have its own title bar // macOS only
        // vibrancy: "under-window", // macOS only
        // visualEffectState: "active", // macOS only
        // trafficLightPosition: {x: 15, y: 10}, // macOS only
        transparent: true,
        autoHideMenuBar: true,
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString()
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, "index.html"));
    }

    ipcMain.on('minimizeApp', () => {
        if (win) {
            win.minimize()
        }
    })
    
    ipcMain.on('maximizeApp', () => {
        if (win) {
            if (!win.isMaximized()) {
                win.maximize()
            } else {
                win.unmaximize()
            }
        }
    })
    
    ipcMain.on('closeApp', () => {
        if (win) {
            win.close()
        }
    })
}

// usage : window.ipcRenderer.invoke('db-query', sql);
ipcMain.handle('db-query', async (event: any, sqlQuery: any) => {
    return new Promise(res => {
        db.all(sqlQuery, (err: any, rows:any) => {
          res(rows);
        });
    });
  });

// usage : window.ipcRenderer.invoke('db-insert', { sql, params: [...] });
ipcMain.handle('db-insert', async (event: any, sqlQuery: any) => {
    return new Promise(res => {
        db.run(sqlQuery.sql, sqlQuery.params, (err: any) => {
          res(err);
        });
    });
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
