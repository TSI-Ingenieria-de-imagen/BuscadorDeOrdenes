const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const express = require("express");
const { error, log } = require("console");
const router = express.Router();
const { exec } = require("child_process");


// **********  COPIAR DE ARCHIVOS DE ORIGEN A TEMPO ******************** // 

const copiarArchivo = (req, res) => {
  // Función para copiar un archivo específico
  const copiarUnArchivo = (archivoOrigen, archivoDestino, callback) => {
    // Leer el archivo original con codificación 'latin1'
    fs.readFile(archivoOrigen, "latin1", (err, contenidoAnsi) => {
      if (err) {
        console.error(
          `Error al leer el archivo de origen (${archivoOrigen}):`,
          err
        );
        callback(err);
        return;
      }

      // Escribir el contenido leído en el archivo de destino con codificación UTF-8
      fs.writeFile(archivoDestino, contenidoAnsi, "utf8", (err) => {
        if (err) {
          console.error(
            `Error al escribir el archivo en "${archivoDestino}":`,
            err
          );
          callback(err);
          return;
        }

        callback();
      });
    });
  };

  // Copiar primero OFYTIPOS.txt
  copiarUnArchivo(
    "\\\\KYRIOS\\Repsol\\OFYTIPOS.txt",
    "C:/TEMP/OFYTIPOS.txt",
    (err1) => {
      if (err1) {
        res.status(500).json({ mensaje: `Error al copiar OFYTIPOS.txt` });
        return;
      }

      // Luego copiar OFYTIPOS2.txt
      copiarUnArchivo(
        "\\\\KYRIOS\\Repsol\\OFYTIPOS2.txt",
        "C:/TEMP/OFYTIPOS2.txt",
        (err2) => {
          if (err2) {
            res
              .status(500)
              .json({ mensaje: `Error al copiar OFYTIPOS2.txt` });
            return;
          }

          // Finalmente copiar PRUEBA1.txt
          copiarUnArchivo(
            "\\\\KYRIOS\\Repsol\\PRUEBA1.txt",
            "C:/TEMP/PRUEBA1.txt",
            (err3) => {
              if (err3) {
                res
                  .status(500)
                  .json({ mensaje: `Error al copiar PRUEBA1.txt` });
                return;
              }

              // Si todo salió bien
              res.json({ mensaje: "OK" });
            }
          );
        }
      );
    }
  );
};



// *************  Configuracion de entrada para todos los clientes ************************** // 

const configuracionesClientes1 = {
  // Clientes Varios : 
  OCC: {
    basePath: "\\\\kyrios\\ClientesVarios\\CATALANA OCCIDENTE - OCC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\CATALANA OCCIDENTE - OCC\\"
  },
  NGB: {
    basePath: "\\\\kyrios\\ClientesVarios\\ABANCA - NGB\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\ABANCA - NGB\\"
  },
  ADL: {
    basePath: "\\\\kyrios\\ClientesVarios\\ADESLAS - ADL\\",
    noCampanaPath: "ES\\00-Obras\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\ADESLAS - ADL\\"
  },
    BOS: {
    basePath: "\\\\kyrios\\ClientesVarios\\Bosch - BOS\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  LCX: {
    basePath: "\\\\kyrios\\ClientesVarios\\CAIXA BANK - LCC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\CAIXA BANK - LCC\\"
  },
  LCC: {
    basePath: "\\\\kyrios\\ClientesVarios\\CAIXA BANK - LCC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\CAIXA BANK - LCC\\"
  },
  GTE: {
    basePath: "\\\\kyrios\\ClientesVarios\\ECHEVERRIA - GTE\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\ECHEVERRIA - GTE\\"
  },
  HAC: {
    basePath: "\\\\kyrios\\ClientesVarios\\EL HACEDOR - HAC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\EL HACEDOR - HAC\\"
  },
  NHN: {
    basePath: "\\\\kyrios\\ClientesVarios\\EL HACEDOR - NHN\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\EL HACEDOR - NHN\\"
  },
  FAT: {
    basePath: "\\\\kyrios\\ClientesVarios\\FASTNET - FAT\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\FASTNET - FAT\\"
  },
  FDS: {
    basePath: "\\\\kyrios\\ClientesVarios\\FEDEX - FDS\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\{nombreCampaña}\\",
    historicoRoot: "\\\\kyrios\\Historicos\\CliVar\\FEDEX - FDS\\"
  },

  // ... replicar para el resto de Clientes Varios ...

  // Clientes Principales : 
  // Repsol
  REP: {
    basePath: "\\\\Kyrios\\REPSOL\\ESP\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historico REPSOL\\ESP\\00-REDEES\\"
  },
  RPP: {
    basePath: "\\\\Kyrios\\REPSOL\\POR\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historico REPSOL\\POR\\00-REDEES\\"
  },
  REX: {
    basePath: "\\\\Kyrios\\REPSOL\\MEX\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historico REPSOL\\MEX\\00-REDEES\\"
  },

  // Galp
  GAP: {
    basePath: "\\\\Kyrios\\galp\\ES\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historicos\\galp\\ES\\00-REDEES\\"
  },
  GPT: {
    basePath: "\\\\Kyrios\\galp\\PT\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historicos\\galp\\PT\\00-REDEES\\"
  },

  // Cepsa (todos equivalentes a CGS)
  CGS: {
    basePath: "\\\\Kyrios\\cepsa\\ES\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historicos\\cepsa\\ES\\00-REDEES\\"
  },
  CCL: {},
  CEO: {},
  CET: {},
  CSA: {},
  CED: {},
  CVR: {},
  CSP: {
    basePath: "\\\\Kyrios\\cepsa\\PT\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historicos\\cepsa\\PT\\00-REDEES\\"
  },
  CEG: {
    basePath: "\\\\Kyrios\\cepsa\\GI\\00-REDEES\\",
    historicoRoot: "\\\\Kyrios\\Historicos\\cepsa\\GI\\00-REDEES\\"
  },

  // Shell
  DSA: {
    basePath: "\\\\KYRIOS\\Shell\\ES\\00-REDEES\\",
    historicoRoot: "\\\\KYRIOS\\Historicos\\Shell\\ES\\00-REDEES\\"
  },
  DSL: {
    basePath: "\\\\KYRIOS\\Shell\\PT\\00-REDEES\\",
    historicoRoot: "\\\\KYRIOS\\Historicos\\Shell\\PT\\00-REDEES\\"
  }
};

const destinos1 = {
  0: "00 PED", 1: "01 TD", 2: "02 PIC-PTTO", 3: "03 FAB",
  4: "04 MONT", 5: "05 CFO", 6: "06 PREF", 7: "07 OBJ",
  8: "08 COMUNICADOS", 9: "09 PRL", 10: "10 FRA-PRO",
};

function buscarOrden(req, res) {
  const orden = req.params.numeroOF;
  const destino = req.body.destino;
  if (!orden) return res.status(400).send('Entrada inválida');

  fs.readFile('C:/TEMP/PRUEBA1.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer el archivo');

    const lineas = data.split(/\r?\n/);
    const lineaRaw = lineas.find(l => l.split(';')[0] === orden);

    // LOG de la línea cruda antes de split
    console.log('---------------------------');
    console.log('Raw:', lineaRaw);
    if (lineaRaw) {
      // LOG de cada campo relevante después del split
      const campos = lineaRaw.split(',');
      console.log('Campos:');
      campos.forEach((campo, i) => {
        console.log(`[${i}]:`, campo);
      });
    }
    console.log('---------------------------');

    if (!lineaRaw) return res.status(404).send('Orden no encontrada');

    const [
      numeroOF, tipoOF, aviso,
      codigoCliente, provincia, refObra, archivoServidor,
      nombreCampana, anioCampana, tieneCampana
    ] = lineaRaw.split(';');

    const config = configuracionesClientes1[codigoCliente];
    if (!config) return res.status(404).send('Configuración no encontrada para ' + codigoCliente);

    const parts = [];
    if (tieneCampana === 'S' && config.campanaPath) {
      parts.push(...config.campanaPath
        .replace('{año}', anioCampana)
        .replace('{nombreCampaña}', nombreCampana)
        .split('\\')
        .filter(Boolean)
      );
    } else if (config.noCampanaPath) {
      parts.push(...config.noCampanaPath.split('\\').filter(Boolean));
    }
    parts.push(provincia);
    parts.push(`${refObra} - ${archivoServidor}`);
    parts.push(`${numeroOF.slice(0,4)}-${numeroOF.slice(4)} - ${tipoOF}`);

    const rutaNormalBase = path.win32.join(config.basePath, ...parts);
    const rutaHistoricaBase = path.win32.join(config.historicoRoot, ...parts);

    const rutaCompleta = (destino != null && destinos1.hasOwnProperty(destino))
      ? path.win32.join(rutaNormalBase, destinos1[destino])
      : rutaNormalBase;
    const rutaHistWithDest = (destino != null && destinos1.hasOwnProperty(destino))
      ? path.win32.join(rutaHistoricaBase, destinos1[destino])
      : rutaHistoricaBase;

    console.log('Intentando ruta normal:', rutaCompleta);
    console.log('Intentando ruta histórica:', rutaHistWithDest);
    console.log('Partes de la ruta:', parts);

    const abrirYCerrar = (ruta, mensaje) => {
      console.log('Abriendo:', ruta);
      exec(`start "" "${ruta}"`, error => {
        if (error) {
          console.error('Error al abrir carpeta:', error);
          return res.status(500).send(mensaje || 'Error al abrir la carpeta');
        }
        return mensaje ? res.send({ ruta, mensaje }) : res.send({ ruta });
      });
    };

    fs.access(rutaCompleta, fs.constants.F_OK, errMain => {
      if (!errMain) return abrirYCerrar(rutaCompleta);

      fs.access(rutaHistWithDest, fs.constants.F_OK, errHist => {
        if (!errHist) {
          return abrirYCerrar(rutaHistWithDest, 'No se encontró en la ubicación normal, mostrando en Histórico.');
        }
        const rutaProv = path.win32.join(config.basePath, provincia);
        console.log('Intentando fallback provincia:', rutaProv);
        fs.access(rutaProv, fs.constants.F_OK, errProv => {
          if (errProv) {
            console.error('No encontrada carpeta de provincia:', errProv.message);
            return res.status(500).send('Error al abrir la carpeta de la provincia');
          }
          abrirYCerrar(rutaProv, 'Mostrando carpeta de la provincia.');
        });
      });
    });
  });
}


// Misma logica pero para buscar por avisos


function buscarAviso(req, res) {
  const aviso = req.params.numeroOF; // Ahora la entrada es el aviso
  const destino = req.body.destino;
  if (!aviso) return res.status(400).send('Entrada inválida');

  fs.readFile('C:/TEMP/PRUEBA1.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer el archivo');

    const lineas = data.split(/\r?\n/);
    // Busca por el campo 2 (aviso), no por el 0 (número OF)
    const lineaRaw = lineas.find(l => l.split(';')[2] === aviso);

    // LOG de la línea cruda antes de split
    console.log('---------------------------');
    console.log('Raw:', lineaRaw);
    if (lineaRaw) {
      const campos = lineaRaw.split(',');
      console.log('Campos:');
      campos.forEach((campo, i) => {
        console.log(`[${i}]:`, campo);
      });
    }
    console.log('---------------------------');

    if (!lineaRaw) return res.status(404).send('Aviso no encontrado');

    // El resto igual
    const [
      numeroOF, tipoOF, avisoCampo,
      codigoCliente, provincia, refObra, archivoServidor,
      nombreCampana, anioCampana, tieneCampana
    ] = lineaRaw.split(';');

    const config = configuracionesClientes1[codigoCliente];
    if (!config) return res.status(404).send('Configuración no encontrada para ' + codigoCliente);

    const parts = [];
    if (tieneCampana === 'S' && config.campanaPath) {
      parts.push(...config.campanaPath
        .replace('{año}', anioCampana)
        .replace('{nombreCampaña}', nombreCampana)
        .split('\\')
        .filter(Boolean)
      );
    } else if (config.noCampanaPath) {
      parts.push(...config.noCampanaPath.split('\\').filter(Boolean));
    }
    parts.push(provincia);
    parts.push(`${refObra} - ${archivoServidor}`);
    parts.push(`${numeroOF.slice(0,4)}-${numeroOF.slice(4)} - ${tipoOF}`);

    const rutaNormalBase = path.win32.join(config.basePath, ...parts);
    const rutaHistoricaBase = path.win32.join(config.historicoRoot, ...parts);

    const rutaCompleta = (destino != null && destinos1.hasOwnProperty(destino))
      ? path.win32.join(rutaNormalBase, destinos1[destino])
      : rutaNormalBase;
    const rutaHistWithDest = (destino != null && destinos1.hasOwnProperty(destino))
      ? path.win32.join(rutaHistoricaBase, destinos1[destino])
      : rutaHistoricaBase;

    console.log('Intentando ruta normal:', rutaCompleta);
    console.log('Intentando ruta histórica:', rutaHistWithDest);
    console.log('Partes de la ruta:', parts);

    const abrirYCerrar = (ruta, mensaje) => {
      console.log('Abriendo:', ruta);
      exec(`start "" "${ruta}"`, error => {
        if (error) {
          console.error('Error al abrir carpeta:', error);
          return res.status(500).send(mensaje || 'Error al abrir la carpeta');
        }
        return mensaje ? res.send({ ruta, mensaje }) : res.send({ ruta });
      });
    };

    fs.access(rutaCompleta, fs.constants.F_OK, errMain => {
      if (!errMain) return abrirYCerrar(rutaCompleta);

      fs.access(rutaHistWithDest, fs.constants.F_OK, errHist => {
        if (!errHist) {
          return abrirYCerrar(rutaHistWithDest, 'No se encontró en la ubicación normal, mostrando en Histórico.');
        }
        const rutaProv = path.win32.join(config.basePath, provincia);
        console.log('Intentando fallback provincia:', rutaProv);
        fs.access(rutaProv, fs.constants.F_OK, errProv => {
          if (errProv) {
            console.error('No encontrada carpeta de provincia:', errProv.message);
            return res.status(500).send('Error al abrir la carpeta de la provincia');
          }
          abrirYCerrar(rutaProv, 'Mostrando carpeta de la provincia.');
        });
      });
    });
  });
}


module.exports = { buscarOrden, buscarAviso, copiarArchivo };