const { contextBridge, ipcRenderer } = require('electron');

// Open up ipcRenderer APIs
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

// Open clipboard APIs
// contextBridge.exposeInMainWorld('clipboard', clipboard);