const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const path = require('path');

let win;

// Create main browser window for app with prefs
const createWindow = () => {
    win = new BrowserWindow({
        transparent: true,
        frame: false,
        resizable: false,
        width: 800,
        height: 335,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            devTools: false
        }
    });

    win.loadFile('index.html');
}

// Load window when ready event fired
app.whenReady().then(() => {
    createWindow();

    // MacOS specific open window when window is closed
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Windows - Close app when window is closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// IPC Process to see when button is clicked
ipcMain.on('close-clicked', (event, args) => {
    console.log('Close App');
    app.quit();
});

// Events to add text to system clipboard
ipcMain.on('copy-variant-clicked', (event, args) => {
    console.log('Copied Variant ID: ', args);
    clipboard.writeText(args);
});

ipcMain.on('copy-catalog-code-clicked', (event, args) => {
    console.log('Copied Catalog Code: ', args);
    clipboard.writeText(args);
});

// Reload page
ipcMain.on('clear-page', (event, args) => {
    console.log('Clearing Page');
    win.reload();
});