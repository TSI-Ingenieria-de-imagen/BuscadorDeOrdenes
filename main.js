const { app, BrowserWindow } = require('electron');
const path = require('path'); 
const url = require('url'); 
// require('electron-reload')(__dirname);  
const startServer = require('./api-buscador/src/apiRest');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 180,
    webPreferences: {
      nodeIntegration: true
    },
    frame: true 
  });

  mainWindow.setMenu(null);

  // mainWindow.loadURL('http://localhost:4200');

 
  const indexPath = path.join(__dirname, 'dist', 'front-buscador-of', 'index.html');

  mainWindow.loadURL(
    url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// app.on('ready', createWindow);

app.on('ready', () => {
  createWindow();
  startServer();  // Inicia tu API 
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
