const { contextBridge, ipcRenderer } = require('electron');

// Open up ipcRenderer APIs
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
