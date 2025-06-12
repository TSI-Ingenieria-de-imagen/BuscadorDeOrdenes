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




// ******************** OBSOLETO ************** NORMAL : 

// const destinos = {
//   0: "00 PED",
//   1: "01 TD",
//   2: "02 PIC-PTTO",
//   3: "03 FAB",
//   4: "04 MONT",
//   5: "05 CFO",
//   6: "06 PREF",
//   7: "07 OBJ",
//   8: "08 COMUNICADOS",
//   9: "09 PRL",
//   10: "10 FRA-PRO",
// };

// const buscarOrden = (req, res) => {
//   const orden = req.params.numeroOF;
//   const destino = req.body.destino;

//   if (!orden) {
//     res.status(400).send("Entrada inválida");
//     return;
//   }

//   fs.readFile("C:/TEMP/OFYTIPOS.txt", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error al leer el archivo");
//       return;
//     }

//     const lineas = data.split("\n");
//     let lineaEncontrada = null;
//     for (const linea of lineas) {
//       const campos = linea.split(",");
//       if (campos[0] === orden) {
//         lineaEncontrada = campos;
//         break;
//       }
//     }

//     if (!lineaEncontrada) {
//       console.error("Orden no encontrada:", orden);
//       res.status(404).send("Orden no encontrada");
//       return;
//     }

//     const tipoCliente = lineaEncontrada[6];
//     let rutaBase = "";
//     switch (tipoCliente) {
//       case "REP":
//         rutaBase = "\\\\Kyrios\\REPSOL\\ESP\\00-REDEES\\";
//         break;
//       case "RPP":
//         rutaBase = "\\\\Kyrios\\REPSOL\\POR\\00-REDEES\\";
//         break;
//       case "REX":
//         rutaBase = "\\\\Kyrios\\REPSOL\\MEX\\00-REDEES\\";
//         break;
//       case "GAP":
//         rutaBase = "\\\\Kyrios\\galp\\ES\\00-REDEES\\";
//         break;
//       case "GPT":
//         rutaBase = "\\\\Kyrios\\galp\\PT\\00-REDEES\\";
//         break;
//       case "CGS":
//       case "CCL":
//       case "CEO":
//       case "CET":
//       case "CSA":
//       case "CED":
//       case "CVR":
//         rutaBase = "\\\\Kyrios\\cepsa\\ES\\00-REDEES\\";
//         break;
//       case "CSP":
//         rutaBase = "\\\\Kyrios\\cepsa\\PT\\00-REDEES\\";
//         break;
//       case "CEG":
//         rutaBase = "\\\\Kyrios\\cepsa\\GI\\00-REDEES\\";
//         break;
//       case "FCP":
//         rutaBase = "\\\\Kyrios\\ClientesVarios\\CEPSA - FCP\\ES\\00-Obras\\";
//         break;
//       case "SPS":
//         rutaBase = "\\\\Kyrios\\ClientesVarios\\CESPA - SPS\\ES\\00-Obras\\";
//         break;
//       case "DSA":
//         rutaBase = "\\\\KYRIOS\\Shell\\ES\\00-REDEES\\";
//         break;
//       case "DSL":
//         rutaBase = "\\\\KYRIOS\\Shell\\PT\\00-REDEES\\";
//         break;
//       default:
//         res.status(400).send("Tipo de cliente no reconocido");
//         return;
//     }

//     // Subcarpeta de ciudad y obra, y carpeta OF
//     const subcarpeta = `${lineaEncontrada[3]} - ${lineaEncontrada[5]}`;
//     const ofCarpeta = `${lineaEncontrada[0].slice(0,4)}-${lineaEncontrada[0].slice(4)} - ${lineaEncontrada[1]}`;

//     // Ruta completa normal
//     let rutaCompleta = `${rutaBase}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
//     if (destino != null && destinos.hasOwnProperty(destino)) {
//       rutaCompleta += `\\${destinos[destino]}`;
//     }

//     // Función auxiliar para abrir y responder
//     const abrirYCerrar = (ruta, mensaje) => {
//       const cmd = `start "" "${ruta}"`;
//       exec(cmd, error => {
//         if (error) {
//           console.error("Error al abrir la carpeta:", error);
//           return res.status(500).send(mensaje || "Error al abrir la carpeta");
//         }
//         if (mensaje) {
//           return res.send({ ruta, mensaje });
//         }
//         return res.send({ ruta });
//       });
//     };

//     // 1) Intentar ruta completa
//     fs.access(rutaCompleta, fs.constants.F_OK, errMain => {
//       if (!errMain) {
//         return abrirYCerrar(rutaCompleta);
//       }

//       // 2) Intentar en histórico
//       let rutaHistBase;
//       // Variante: para Repsol usar carpeta específica
//       if (["REP","RPP","REX"].includes(tipoCliente)) {
//         // extraer sufijo de rutaBase: por ejemplo "ESP\\00-REDEES\\"
//         const sufijo = rutaBase.split("\\").slice(-3).join("\\");
//         rutaHistBase = `\\\\Kyrios\\Historico REPSOL\\${sufijo}`;
//       } else {
//         // resto de clientes: carpeta "Historicos" genérica
//         rutaHistBase = rutaBase.replace(/^\\\\Kyrios\\/i, "\\\\Kyrios\\Historicos\\");
//       }

//       let rutaHistoricos = `${rutaHistBase}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
//       if (destino != null && destinos.hasOwnProperty(destino)) {
//         rutaHistoricos += `\\${destinos[destino]}`;
//       }

//       fs.access(rutaHistoricos, fs.constants.F_OK, errHist => {
//         if (!errHist) {
//           return abrirYCerrar(
//             rutaHistoricos,
//             "No se encontró en la ubicación normal, mostrando en Histórico."
//           );
//         }

//         // 3) Fallback final: carpeta anterior
//         console.log("No existe ni en principal ni en Histórico");
//         const rutaAnterior = `${rutaBase}${lineaEncontrada[4]}\\${subcarpeta}`;
//         abrirYCerrar(
//           rutaAnterior,
//           "No se encontró la carpeta de detalle ni en Histórico, mostrando carpeta anterior."
//         );
//       });
//     });
//   });
// };


// ************ OBSOLOTO CLIENTES VARIOS ******************* // 


// const configuracionesClientes = {
//   OCC: {
//     basePath: "\\\\kyrios\\ClientesVarios\\CATALANA OCCIDENTE - OCC\\",
//     noCampanaPath: "ES\\00-Obras\\",
//     campanaPath: "01-CAMPAÑAS {año}\\OCCIMGOFI\\",
//   },
//   NGB: {
//     basePath: "\\\\kyrios\\ClientesVarios\\ABANCA - NGB\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   ADL: {
//     basePath: "\\\\kyrios\\ClientesVarios\\ADESLAS - ADL\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   BOS: {
//     basePath: "\\\\kyrios\\ClientesVarios\\Bosch - BOS\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   LCX: {
//     basePath: "\\\\kyrios\\ClientesVarios\\CAIXA BANK - LCC\\",
//     noCampanaPath: "ES\\00-Obras\\",
//     campanaPath: "01-CAMPAÑAS {año}\\",
//   },
//   LCC: {
//     basePath: "\\\\kyrios\\ClientesVarios\\CAIXA BANK - LCC\\",
//     noCampanaPath: "ES\\00-Obras\\",
//     campanaPath: "01-CAMPAÑAS {año}\\",
//   },
//   GTE: {
//     basePath: "\\\\kyrios\\ClientesVarios\\ECHEVERRIA - GTE\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   FDS: {
//     basePath: "\\\\KYRIOS\\ClientesVarios\\FEDEX - FDS\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   TNT: {
//     basePath: "\\\\KYRIOS\\ClientesVarios\\TNT EXPRESS WORLDWIDE - TNT\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   OYS: {
//     basePath: "\\\\KYRIOS\\ClientesVarios\\SEAT - OYS\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
//   SEA: {
//     basePath: "\\\\KYRIOS\\ClientesVarios\\SEAT - SEA\\",
//     noCampanaPath: "ES\\00-Obras\\",
//   },
// };


// const buscarOrdenCv = (req, res) => {
//   const orden = req.params.numeroOF;
//   const destino = req.body.destino;

//   if (!orden) {
//     return res.status(400).send("Entrada inválida");
//   }

//   fs.readFile("C:\\TEMP\\OFYTIPOS2.txt", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error al leer el archivo");
//     }

//     const lineas = data.split("\n");
//     let lineaEncontrada = null;
//     for (const linea of lineas) {
//       const campos = linea.split(",");
//       if (campos[0] === orden) {
//         lineaEncontrada = campos;
//         break;
//       }
//     }
//     if (!lineaEncontrada) {
//       console.error("Orden no encontrada:", orden);
//       return res.status(404).send("Orden no encontrada");
//     }

//     const cliente = lineaEncontrada[6];
//     const config = configuracionesClientes[cliente];
//     if (!config) {
//       console.error("Configuración no encontrada para el cliente:", cliente);
//       return res.status(404).send("Configuración no encontrada para el cliente");
//     }

//     // Base + (campaña o no)
//     let rutaBase = config.basePath;
//     if (lineaEncontrada[9] === "S" && config.campanaPath) {
//       rutaBase += config.campanaPath.replace("{año}", lineaEncontrada[8]);
//     } else {
//       rutaBase += config.noCampanaPath;
//     }

//     const subcarpeta = `${lineaEncontrada[3]} - ${lineaEncontrada[5]}`;
//     const ofCarpeta = `${lineaEncontrada[0].slice(0,4)}-${lineaEncontrada[0].slice(4)} - ${lineaEncontrada[1]}`;
//     let rutaCompleta = `${rutaBase}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
//     if (destino != null && destinos.hasOwnProperty(destino)) {
//       rutaCompleta += `\\${destinos[destino]}`;
//     }

//     // helper para abrir carpeta y responder
//     console.log(rutaCompleta);
    
//     const abrirYCerrar = (ruta, mensaje) => {
//       exec(`start "" "${ruta}"`, error => {
//         if (error) {
//           console.error("Error al abrir carpeta:", error);
//           return res.status(500).send(mensaje || "Error al abrir la carpeta");
//         }
//         if (mensaje) return res.send({ ruta, mensaje });
//         return res.send({ ruta });
//       });
//     };

//     // 1) comprueba rutaCompleta
//     fs.access(rutaCompleta, fs.constants.F_OK, errMain => {
//       if (!errMain) {
//         return abrirYCerrar(rutaCompleta);
//       }

//       // 2) fallback histórico de Clientes Varios
//       const rutaHist = rutaBase.replace(
//         /^\\\\kyrios\\ClientesVarios\\/i,
//         "\\\\kyrios\\Historicos\\CliVar\\"
//       );
//       let rutaHistoricos = `${rutaHist}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
//       if (destino != null && destinos.hasOwnProperty(destino)) {
//         rutaHistoricos += `\\${destinos[destino]}`;
//       }

//       fs.access(rutaHistoricos, fs.constants.F_OK, errHist => {
//         if (!errHist) {
//           return abrirYCerrar(
//             rutaHistoricos,
//             "No se encontró en la ubicación normal, mostrando en Histórico."
//           );
//         }

//         // 3) último recurso: carpeta de provincia
//         console.log("No existe ruta normal ni histórica", rutaBase,lineaEncontrada[4]);
//         const rutaProvincia = `${rutaBase}${lineaEncontrada[4]}`;
//         fs.access(rutaProvincia, fs.constants.F_OK, errProv => {
//           if (errProv) {
//             console.error("Tampoco se encontró la carpeta de la provincia:", errProv.message);
//             return res.status(500).send("Error al abrir la carpeta de la provincia");
//           }
//           abrirYCerrar(
//             rutaProvincia,
//             "La carpeta especificada no se encontró, se ha abierto la carpeta de la provincia."
//           );
//         });
//       });
//     });
//   });
// };
