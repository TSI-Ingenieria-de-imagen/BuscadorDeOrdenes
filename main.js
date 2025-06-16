const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');
const startServer = require('./api-buscador/src/apiRest');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 180,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Necesario si usas nodeIntegration
    },
    frame: true 
  });

  // mainWindow.setMenu(null);

  // mainWindow.loadURL('http://localhost:4200'); // para desarrollo 

  const fs = require('fs');
  // --- PRIMERO busca en producción instalada ---
  let indexPath = path.join(process.resourcesPath, 'app', 'dist', 'front-buscador-of', 'index.html');

  // --- Si no existe, busca en entorno desarrollo ---
  if (!fs.existsSync(indexPath)) {
    indexPath = path.join(__dirname, 'dist', 'front-buscador-of', 'index.html');
  }

  // --- Si sigue sin existir, muestra error ---
  if (!fs.existsSync(indexPath)) {
    dialog.showErrorBox('ERROR', `No se encontró index.html en:\n${indexPath}`);
    return app.quit();
  }

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
  startServer(); // Lanza la API

  autoUpdater.checkForUpdatesAndNotify(); // comprueba si hay updates
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Actualización disponible',
    message: 'Hay una nueva versión disponible. Se descargará en segundo plano.'
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['Reiniciar y actualizar', 'Más tarde'],
    defaultId: 0,
    message: 'La nueva versión está lista. ¿Quieres reiniciar ahora para actualizar?',
  }).then(result => {
    if (result.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Descargando actualización: " + Math.round(progressObj.percent) + "%";
  // Puedes mostrarlo con un dialog, consola, o enviarlo al renderer vía IPC
  console.log(log_message);
});

autoUpdater.on('download-progress', (progressObj) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Descargando actualización',
    message: `Progreso: ${Math.round(progressObj.percent)}%`
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});


