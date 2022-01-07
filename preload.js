var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
// Open up ipcRenderer APIs
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
// Open clipboard APIs
// contextBridge.exposeInMainWorld('clipboard', clipboard);
