// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const { PythonShell } = require('python-shell');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  PythonShell
});
