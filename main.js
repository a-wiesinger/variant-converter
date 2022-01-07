var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain, clipboard = _a.clipboard;
var path = require('path');
var win;
// Create main browser window for app with prefs
var createWindow = function () {
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
};
// Load window when ready event fired
app.whenReady().then(function () {
    createWindow();
    // MacOS specific open window when window is closed
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Windows - Close app when window is closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});
// IPC Process to see when button is clicked
ipcMain.on('close-clicked', function (event, args) {
    console.log('Close App');
    app.quit();
});
// Events to add text to system clipboard
ipcMain.on('copy-variant-clicked', function (event, args) {
    console.log('Copied Variant ID: ', args);
    clipboard.writeText(args);
});
ipcMain.on('copy-catalog-code-clicked', function (event, args) {
    console.log('Copied Catalog Code: ', args);
    clipboard.writeText(args);
});
// Reload page
ipcMain.on('clear-page', function (event, args) {
    console.log('Clearing Page');
    win.reload();
});
