const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');
const startServer = require('./api-buscador/src/apiRest');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.transports.console.level = 'debug';
autoUpdater.autoDownload = true;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 180,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: true 
  });

  // --- DETECCIÓN SIMPLIFICADA ---
  if (!app.isPackaged) {
    log.info('Entorno: DESARROLLO (cargando localhost:4200)');
    mainWindow.loadURL('http://localhost:4200');
  } else {
    log.info('Entorno: PRODUCCIÓN (cargando index.html empaquetado)');
    const fs = require('fs');
    let indexPath = path.join(process.resourcesPath, 'app', 'dist', 'front-buscador-of', 'index.html');
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(__dirname, 'dist', 'front-buscador-of', 'index.html');
    }
    if (!fs.existsSync(indexPath)) {
      dialog.showErrorBox('ERROR', `No se encontró index.html en:\n${indexPath}`);
      log.error('No se encontró index.html en:', indexPath);
      return app.quit();
    }
    mainWindow.loadURL(
      url.format({
        pathname: indexPath,
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  log.info('App ready. Arrancando ventana principal y servidor interno...');
  createWindow();
  startServer();

  log.info('Llamando a autoUpdater.checkForUpdatesAndNotify()');
  autoUpdater.checkForUpdatesAndNotify();
});

// Eventos de autoUpdater
autoUpdater.on('checking-for-update', () => {
  log.info('[autoUpdater] Buscando actualizaciones...');
});
autoUpdater.on('update-available', (info) => {
  log.info('[autoUpdater] Update available:', info);
  dialog.showMessageBox({
    type: 'info',
    title: 'Actualización disponible',
    message: 'Hay una nueva versión disponible. Se descargará en segundo plano.'
  });
});
autoUpdater.on('update-not-available', (info) => {
  log.info('[autoUpdater] No hay nuevas actualizaciones.', info);
});
autoUpdater.on('error', (err) => {
  log.error('[autoUpdater] ERROR:', err == null ? "unknown" : (err.stack || err).toString());
  dialog.showErrorBox('Error en autoUpdater', err == null ? "unknown" : (err.stack || err).toString());
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = `Descargando actualización: ${Math.round(progressObj.percent)}% | ${progressObj.transferred}/${progressObj.total} bytes`;
  log.info('[autoUpdater] ' + log_message);
});
autoUpdater.on('update-downloaded', (info) => {
  log.info('[autoUpdater] Update descargada, lista para instalar:', info);
  dialog.showMessageBox({
    type: 'question',
    buttons: ['Reiniciar y actualizar', 'Más tarde'],
    defaultId: 0,
    message: 'La nueva versión está lista. ¿Quieres reiniciar ahora para actualizar?',
  }).then(result => {
    log.info('[autoUpdater] Respuesta del usuario:', result.response);
    if (result.response === 0) autoUpdater.quitAndInstall();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});




