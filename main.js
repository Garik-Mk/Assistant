const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { PythonShell } = require('python-shell');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 50,
    frame: false, // Убирает рамку окна
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open dev tools
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  }); 

  mainWindow.on('blur', () => {
    mainWindow.setSize(800, 50); 
  });
}

app.on('ready', function () {
  createWindow();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('enable-node-integration');
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on('search', function (event, searchTerm) {
  // Run Python script using python-shell
  PythonShell.run('C:\\Users\\User\\Projects\\assistant\\main\\search.py', { args: [searchTerm] }, function (err, results) {
    if (err) throw err;
    // Results is an array consisting of messages printed during the script execution
    const result = results.join('\n');
    console.log(result);
    mainWindow.webContents.send('search-result', result);
  });
});

ipcMain.on('enable-node-integration', (event) => {
  mainWindow.webContents.send('enable-node-integration');
});

ipcMain.on('input-focused', () => {
  mainWindow.setSize(800, 400); 
});


