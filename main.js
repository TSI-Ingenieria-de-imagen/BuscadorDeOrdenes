const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');
const startServer = require('./api-buscador/src/apiRest');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Para mostrar logs en la consola también (útil en desarrollo)
log.transports.console.level = 'debug';

// OPCIONAL: Forzar autodescarga (suele venir ya así)
autoUpdater.autoDownload = true;

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

// --- Eventos de autoUpdater con logs potentes ---

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
  // Opcional: puedes mostrarlo solo si quieres feedback visible
  // dialog.showMessageBox({ type: 'info', title: 'Descargando actualización', message: log_message });
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



