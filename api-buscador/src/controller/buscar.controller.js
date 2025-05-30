const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const express = require("express");
const { error, log } = require("console");
const router = express.Router();
const { exec } = require("child_process");

// // ***********RUTAS FINALES PARA CONTRUIR CAMINO*******************

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

// // ********************************MANEJAMOS METODO PARA BUSCAR OF******************
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

//     if (lineaEncontrada) {
//       const tipoCliente = lineaEncontrada[6];
//       let rutaBase = "";

//       switch (tipoCliente) {
//         case "REP":
//           rutaBase = "\\\\Kyrios\\REPSOL\\ESP\\00-REDEES\\";
//           break;
//         case "RPP":
//           rutaBase = "\\\\Kyrios\\REPSOL\\POR\\00-REDEES\\";
//           break;
//         case "REX":
//           rutaBase = "\\\\Kyrios\\REPSOL\\MEX\\00-REDEES\\";
//           break;
//         case "GAP":
//           rutaBase = "\\\\Kyrios\\galp\\ES\\00-REDEES\\";
//           break;
//         case "GPT":
//           rutaBase = "\\\\Kyrios\\galp\\PT\\00-REDEES\\";
//           break;
//         case "CGS":
//         case "CCL":
//         case "CEO":
//         case "CET":
//         case "CSA":
//         case "CED":
//         case "CVR":
//           rutaBase = "\\\\Kyrios\\cepsa\\ES\\00-REDEES\\";
//           break;
//         case "CSP":
//           rutaBase = "\\\\Kyrios\\cepsa\\PT\\00-REDEES\\";
//           break;
//         case "CEG":
//           rutaBase = "\\\\Kyrios\\cepsa\\GI\\00-REDEES\\";
//           break;
//         case "FCP":
//           rutaBase = "\\\\Kyrios\\ClientesVarios\\CEPSA - FCP\\ES\\00-Obras\\";
//           break;
//         case "SPS":
//           rutaBase = "\\\\Kyrios\\ClientesVarios\\CESPA - SPS\\ES\\00-Obras\\";
//           break;
//         case "DSA":
//           rutaBase = "\\\\KYRIOS\\Shell\\ES\\00-REDEES\\";
//           break;
//         case "DSL":
//           rutaBase = "\\\\KYRIOS\\Shell\\PT\\00-REDEES\\";
//           break;
//         default:
//           res.status(400).send("Tipo de cliente no reconocido");
//           return;
//       }

//       let rutaCompleta = `${rutaBase}${lineaEncontrada[4]}\\${
//         lineaEncontrada[3]
//       } - ${lineaEncontrada[5]}\\${lineaEncontrada[0].slice(
//         0,
//         4
//       )}-${lineaEncontrada[0].slice(4)} - ${lineaEncontrada[1]}`;

//       if (destino && destinos.hasOwnProperty(destino)) {
//         rutaCompleta += `\\${destinos[destino]}`;
//       }

//       fs.access(rutaCompleta, fs.constants.F_OK, (err) => {
//         if (err) {
//           console.log("Error al acceder a rutaCompleta:", err.message);
//           let rutaAnterior = `${rutaBase}${lineaEncontrada[4]}\\${lineaEncontrada[3]} - ${lineaEncontrada[5]}`;
//           const comandoAnterior = `start "" "${rutaAnterior}"`;
//           exec(comandoAnterior, (error) => {
//             if (error) {
//               console.error("Error al abrir la carpeta anterior:", error);
//               res.status(500).send("Error al abrir la carpeta anterior");
//               return;
//             }
//             res.send({
//               ruta: rutaAnterior,
//               mensaje: `La carpeta especificada no se encontró porque no existe la carpeta ${lineaEncontrada[0].slice(
//                 0,
//                 4
//               )}-${lineaEncontrada[0].slice(4)} - ${
//                 lineaEncontrada[1]
//               } para la orden que has ingresado [${orden}], se ha abierto la carpeta anterior.`,
//             });
//           });
//           return;
//         }

//         const comando = `start "" "${rutaCompleta}"`;
//         exec(comando, (error) => {
//           if (error) {
//             console.error("Error al abrir la carpeta:", error);
//             res.status(500).send("Error al abrir la carpeta");
//             return;
//           }
//           res.send({ ruta: rutaCompleta });
//           console.log(rutaCompleta);
//         });
//       });
//     } else {
//       console.error("Orden no encontrada:", orden);
//       res.status(404).send("Orden no encontrada");
//     }
//   });
// };

// ************MANEJAMOS EL METODO PARA AVISOS***********************

const buscarOM = (req, res) => {
  console.log("Inicio de la función buscarOM");
  const om = req.params.numeroOM;
  const destino = String(req.body.destino);

  console.log("OM:", om);
  console.log("Destino:", destino);
  console.log("Tipo de destino:", typeof destino);
  console.log("Valor de destinos[destino]:", destinos[destino]);

  if (!om) {
    console.log("OM no proporcionado");
    res.status(400).send("Entrada inválida");
    return;
  }

  fs.readFile("C:/TEMP/OFYTIPOS.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      res.status(500).send("Error al leer el archivo");
      return;
    }

    console.log("Archivo leído exitosamente");
    const lineas = data.split("\n");
    let lineaEncontrada = null;

    for (const linea of lineas) {
      const campos = linea.split(",");
      if (campos[2] === om) {
        lineaEncontrada = campos;
        break;
      }
    }

    console.log("Línea encontrada:", lineaEncontrada);

    if (lineaEncontrada) {
      const tipoCliente = lineaEncontrada[6];
      let rutaBase = "";
      switch (tipoCliente) {
        case "REP":
          rutaBase = "\\\\Kyrios\\REPSOL\\ESP\\00-REDEES\\";
          break;
        case "RPP":
          rutaBase = "\\\\Kyrios\\REPSOL\\POR\\00-REDEES\\";
          break;
        case "REX":
          rutaBase = "\\\\Kyrios\\REPSOL\\MEX\\00-REDEES\\";
          break;
        case "GAP":
          rutaBase = "\\\\Kyrios\\galp\\ES\\00-REDEES\\";
          break;
        case "GPT":
          rutaBase = "\\\\Kyrios\\galp\\PT\\00-REDEES\\";
          break;
        case "CGS":
        case "CCL":
        case "CEO":
        case "CET":
        case "CSA":
        case "CED":
        case "CVR":
          rutaBase = "\\\\Kyrios\\cepsa\\ES\\00-REDEES\\";
          break;
        case "CSP":
          rutaBase = "\\\\Kyrios\\cepsa\\PT\\00-REDEES\\";
          break;
        case "CEG":
          rutaBase = "\\\\Kyrios\\cepsa\\GI\\00-REDEES\\";
          break;
        case "FCP":
          rutaBase = "\\\\Kyrios\\ClientesVarios\\CEPSA - FCP\\ES\\00-Obras\\";
          break;
        case "SPS":
          rutaBase = "\\\\Kyrios\\ClientesVarios\\CESPA - SPS\\ES\\00-Obras\\";
          break;
        default:
          res.status(400).send("Tipo de cliente no reconocido");
          return;
      }

      console.log("Ruta base:", rutaBase);

      let rutaIntermedia = `${rutaBase}${lineaEncontrada[4]}\\${lineaEncontrada[3]} - ${lineaEncontrada[5]}`;
      let rutaCompleta = `${rutaIntermedia}\\${lineaEncontrada[0].slice(
        0,
        4
      )}-${lineaEncontrada[0].slice(4)} - ${lineaEncontrada[1]}`;

      console.log("Ruta intermedia:", rutaIntermedia);
      console.log("Ruta completa:", rutaCompleta);

      // Verificar la existencia de la ruta intermedia
      fs.access(rutaIntermedia, fs.constants.F_OK, (err) => {
        if (err) {
          console.log("Error al acceder a rutaIntermedia:", err.message);
          res.send({
            ruta: rutaBase,
            mensaje: "La ruta intermedia no se encontró en el directorio",
          });
          const comandoBase = `start "" "${rutaBase}"`;
          exec(comandoBase);
          return;
        }
        console.log("Verificando acceso a ruta intermedia");

        fs.access(rutaCompleta, fs.constants.F_OK, (err) => {
          if (err) {
            console.log(
              "Error al acceder a rutaCompleta:",
              err.message,
              "Código de Error:",
              err.code
            );
            res.send({
              ruta: rutaIntermedia,
              mensaje: `La carpeta ${lineaEncontrada[0].slice(
                0,
                4
              )}-${lineaEncontrada[0].slice(4)} - ${
                lineaEncontrada[1]
              } que va asociado al aviso ${
                lineaEncontrada[2]
              } según la información de OFYTIPOS.txt , no se ha encontrado en el directorio`,
            });
            const comandoIntermedio = `start "" "${rutaIntermedia}"`;
            exec(comandoIntermedio);
            return;
          }
          console.log("Verificando acceso a ruta completa");

          // Si se especificó un destino, agregarlo a la ruta
          console.log(
            "Destino:",
            destino,
            "Existe en destinos:",
            destinos.hasOwnProperty(destino)
          );
          if (destino && destinos.hasOwnProperty(destino)) {
            rutaCompleta += `\\${destinos[destino]}`;
          }

          console.log("rutaCompleta después de agregar destino:", rutaCompleta);

          // Verificar la existencia de la carpeta de destino, si se especificó
          fs.access(rutaCompleta, fs.constants.F_OK, (err) => {
            if (err) {
              if (destino) {
                res.send({
                  ruta: rutaCompleta,
                  mensaje: `Imposible acceder al destino porque la carpeta ${lineaEncontrada[0].slice(
                    0,
                    4
                  )}-${lineaEncontrada[0].slice(4)} - ${
                    lineaEncontrada[1]
                  } que va asociado al aviso ${
                    lineaEncontrada[2]
                  } según la información de OFYTIPOS.txt, no se ha encontrado en el directorio`,
                });
              } else {
                res.send({
                  ruta: rutaIntermedia,
                  mensaje: `La carpeta ${lineaEncontrada[0].slice(
                    0,
                    4
                  )}-${lineaEncontrada[0].slice(4)} - ${
                    lineaEncontrada[1]
                  } que va asociado al aviso ${
                    lineaEncontrada[2]
                  } según la información de OFYTIPOS.txt, no se ha encontrado en el directorio`,
                });
                const comandoIntermedio = `start "" "${rutaIntermedia}"`;
                exec(comandoIntermedio);
              }
              return;
            }
            console.log("Verificando acceso a ruta completa con destino");

            // Si todas las carpetas existen, ejecutar el comando para abrir la ruta
            const comando = `start "" "${rutaCompleta}"`;
            exec(comando, (error) => {
              if (error) {
                console.error("Error al abrir la carpeta:", error);
                res.status(500).send("Error al abrir la carpeta");
                return;
              }
              console.log("Ejecutando comando para abrir ruta completa");
            });
          });
        });
      });
    } else {
      console.error("OM no encontrada:", om);
      res.status(404).send("OM no encontrada");
    }
  });
};




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

  // Copiar ambos archivos
  copiarUnArchivo(
    "\\\\KYRIOS\\Repsol\\OFYTIPOS.txt",
    "C:/TEMP/OFYTIPOS.txt",
    (err1) => {
      if (err1) {
        res.status(500).json({ mensaje: `Error al copiar OFYTIPOS.txt` });
        return;
      }

      copiarUnArchivo(
        "\\\\KYRIOS\\Repsol\\OFYTIPOS2.txt",
        "C:/TEMP/OFYTIPOS2.txt",
        (err2) => {
          if (err2) {
            res.status(500).json({ mensaje: `Error al copiar OFYTIPOS2.txt` });
            return;
          }

          res.json({ mensaje: "OK" });
        }
      );
    }
  );
};

// ***************************manejo de rutas en clientes varios*********************************

const configuracionesClientes = {
  OCC: {
    basePath: "\\\\kyrios\\ClientesVarios\\CATALANA OCCIDENTE - OCC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\OCCIMGOFI\\",
  },
  NGB: {
    basePath: "\\\\kyrios\\ClientesVarios\\ABANCA - NGB\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  ADL: {
    basePath: "\\\\kyrios\\ClientesVarios\\ADESLAS - ADL\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  BOS: {
    basePath: "\\\\kyrios\\ClientesVarios\\Bosch - BOS\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  LCX: {
    basePath: "\\\\kyrios\\ClientesVarios\\CAIXA BANK - LCC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\",
  },
  LCC: {
    basePath: "\\\\kyrios\\ClientesVarios\\CAIXA BANK - LCC\\",
    noCampanaPath: "ES\\00-Obras\\",
    campanaPath: "01-CAMPAÑAS {año}\\",
  },
  GTE: {
    basePath: "\\\\kyrios\\ClientesVarios\\ECHEVERRIA - GTE\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  FDS: {
    basePath: "\\\\KYRIOS\\ClientesVarios\\FEDEX - FDS\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  TNT: {
    basePath: "\\\\KYRIOS\\ClientesVarios\\TNT EXPRESS WORLDWIDE - TNT\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  OYS: {
    basePath: "\\\\KYRIOS\\ClientesVarios\\SEAT - OYS\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
  SEA: {
    basePath: "\\\\KYRIOS\\ClientesVarios\\SEAT - SEA\\",
    noCampanaPath: "ES\\00-Obras\\",
  },
};


const buscarOrdenCv = (req, res) => {
  const orden = req.params.numeroOF;
  const destino = req.body.destino;

  if (!orden) {
    return res.status(400).send("Entrada inválida");
  }

  fs.readFile("C:\\TEMP\\OFYTIPOS2.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al leer el archivo");
    }

    const lineas = data.split("\n");
    let lineaEncontrada = null;
    for (const linea of lineas) {
      const campos = linea.split(",");
      if (campos[0] === orden) {
        lineaEncontrada = campos;
        break;
      }
    }
    if (!lineaEncontrada) {
      console.error("Orden no encontrada:", orden);
      return res.status(404).send("Orden no encontrada");
    }

    const cliente = lineaEncontrada[6];
    const config = configuracionesClientes[cliente];
    if (!config) {
      console.error("Configuración no encontrada para el cliente:", cliente);
      return res.status(404).send("Configuración no encontrada para el cliente");
    }

    // Base + (campaña o no)
    let rutaBase = config.basePath;
    if (lineaEncontrada[9] === "S" && config.campanaPath) {
      rutaBase += config.campanaPath.replace("{año}", lineaEncontrada[8]);
    } else {
      rutaBase += config.noCampanaPath;
    }

    const subcarpeta = `${lineaEncontrada[3]} - ${lineaEncontrada[5]}`;
    const ofCarpeta = `${lineaEncontrada[0].slice(0,4)}-${lineaEncontrada[0].slice(4)} - ${lineaEncontrada[1]}`;
    let rutaCompleta = `${rutaBase}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
    if (destino != null && destinos.hasOwnProperty(destino)) {
      rutaCompleta += `\\${destinos[destino]}`;
    }

    // helper para abrir carpeta y responder
    console.log(rutaCompleta);
    
    const abrirYCerrar = (ruta, mensaje) => {
      exec(`start "" "${ruta}"`, error => {
        if (error) {
          console.error("Error al abrir carpeta:", error);
          return res.status(500).send(mensaje || "Error al abrir la carpeta");
        }
        if (mensaje) return res.send({ ruta, mensaje });
        return res.send({ ruta });
      });
    };

    // 1) comprueba rutaCompleta
    fs.access(rutaCompleta, fs.constants.F_OK, errMain => {
      if (!errMain) {
        return abrirYCerrar(rutaCompleta);
      }

      // 2) fallback histórico de Clientes Varios
      const rutaHist = rutaBase.replace(
        /^\\\\kyrios\\ClientesVarios\\/i,
        "\\\\kyrios\\Historicos\\CliVar\\"
      );
      let rutaHistoricos = `${rutaHist}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
      if (destino != null && destinos.hasOwnProperty(destino)) {
        rutaHistoricos += `\\${destinos[destino]}`;
      }

      fs.access(rutaHistoricos, fs.constants.F_OK, errHist => {
        if (!errHist) {
          return abrirYCerrar(
            rutaHistoricos,
            "No se encontró en la ubicación normal, mostrando en Histórico."
          );
        }

        // 3) último recurso: carpeta de provincia
        console.log("No existe ruta normal ni histórica", rutaBase,lineaEncontrada[4]);
        const rutaProvincia = `${rutaBase}${lineaEncontrada[4]}`;
        fs.access(rutaProvincia, fs.constants.F_OK, errProv => {
          if (errProv) {
            console.error("Tampoco se encontró la carpeta de la provincia:", errProv.message);
            return res.status(500).send("Error al abrir la carpeta de la provincia");
          }
          abrirYCerrar(
            rutaProvincia,
            "La carpeta especificada no se encontró, se ha abierto la carpeta de la provincia."
          );
        });
      });
    });
  });
};


// Añadir la fallBack , en caso de no encontrarse en la ruta dada , se va a historicos 


const destinos = {
  0: "00 PED",
  1: "01 TD",
  2: "02 PIC-PTTO",
  3: "03 FAB",
  4: "04 MONT",
  5: "05 CFO",
  6: "06 PREF",
  7: "07 OBJ",
  8: "08 COMUNICADOS",
  9: "09 PRL",
  10: "10 FRA-PRO",
};

const buscarOrden = (req, res) => {
  const orden = req.params.numeroOF;
  const destino = req.body.destino;

  if (!orden) {
    res.status(400).send("Entrada inválida");
    return;
  }

  fs.readFile("C:/TEMP/OFYTIPOS.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer el archivo");
      return;
    }

    const lineas = data.split("\n");
    let lineaEncontrada = null;
    for (const linea of lineas) {
      const campos = linea.split(",");
      if (campos[0] === orden) {
        lineaEncontrada = campos;
        break;
      }
    }

    if (!lineaEncontrada) {
      console.error("Orden no encontrada:", orden);
      res.status(404).send("Orden no encontrada");
      return;
    }

    const tipoCliente = lineaEncontrada[6];
    let rutaBase = "";
    switch (tipoCliente) {
      case "REP":
        rutaBase = "\\\\Kyrios\\REPSOL\\ESP\\00-REDEES\\";
        break;
      case "RPP":
        rutaBase = "\\\\Kyrios\\REPSOL\\POR\\00-REDEES\\";
        break;
      case "REX":
        rutaBase = "\\\\Kyrios\\REPSOL\\MEX\\00-REDEES\\";
        break;
      case "GAP":
        rutaBase = "\\\\Kyrios\\galp\\ES\\00-REDEES\\";
        break;
      case "GPT":
        rutaBase = "\\\\Kyrios\\galp\\PT\\00-REDEES\\";
        break;
      case "CGS":
      case "CCL":
      case "CEO":
      case "CET":
      case "CSA":
      case "CED":
      case "CVR":
        rutaBase = "\\\\Kyrios\\cepsa\\ES\\00-REDEES\\";
        break;
      case "CSP":
        rutaBase = "\\\\Kyrios\\cepsa\\PT\\00-REDEES\\";
        break;
      case "CEG":
        rutaBase = "\\\\Kyrios\\cepsa\\GI\\00-REDEES\\";
        break;
      case "FCP":
        rutaBase = "\\\\Kyrios\\ClientesVarios\\CEPSA - FCP\\ES\\00-Obras\\";
        break;
      case "SPS":
        rutaBase = "\\\\Kyrios\\ClientesVarios\\CESPA - SPS\\ES\\00-Obras\\";
        break;
      case "DSA":
        rutaBase = "\\\\KYRIOS\\Shell\\ES\\00-REDEES\\";
        break;
      case "DSL":
        rutaBase = "\\\\KYRIOS\\Shell\\PT\\00-REDEES\\";
        break;
      default:
        res.status(400).send("Tipo de cliente no reconocido");
        return;
    }

    // Subcarpeta de ciudad y obra, y carpeta OF
    const subcarpeta = `${lineaEncontrada[3]} - ${lineaEncontrada[5]}`;
    const ofCarpeta = `${lineaEncontrada[0].slice(0,4)}-${lineaEncontrada[0].slice(4)} - ${lineaEncontrada[1]}`;

    // Ruta completa normal
    let rutaCompleta = `${rutaBase}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
    if (destino != null && destinos.hasOwnProperty(destino)) {
      rutaCompleta += `\\${destinos[destino]}`;
    }

    // Función auxiliar para abrir y responder
    const abrirYCerrar = (ruta, mensaje) => {
      const cmd = `start "" "${ruta}"`;
      exec(cmd, error => {
        if (error) {
          console.error("Error al abrir la carpeta:", error);
          return res.status(500).send(mensaje || "Error al abrir la carpeta");
        }
        if (mensaje) {
          return res.send({ ruta, mensaje });
        }
        return res.send({ ruta });
      });
    };

    // 1) Intentar ruta completa
    fs.access(rutaCompleta, fs.constants.F_OK, errMain => {
      if (!errMain) {
        return abrirYCerrar(rutaCompleta);
      }

      // 2) Intentar en histórico
      let rutaHistBase;
      // Variante: para Repsol usar carpeta específica
      if (["REP","RPP","REX"].includes(tipoCliente)) {
        // extraer sufijo de rutaBase: por ejemplo "ESP\\00-REDEES\\"
        const sufijo = rutaBase.split("\\").slice(-3).join("\\");
        rutaHistBase = `\\\\Kyrios\\Historico REPSOL\\${sufijo}`;
      } else {
        // resto de clientes: carpeta "Historicos" genérica
        rutaHistBase = rutaBase.replace(/^\\\\Kyrios\\/i, "\\\\Kyrios\\Historicos\\");
      }

      let rutaHistoricos = `${rutaHistBase}${lineaEncontrada[4]}\\${subcarpeta}\\${ofCarpeta}`;
      if (destino != null && destinos.hasOwnProperty(destino)) {
        rutaHistoricos += `\\${destinos[destino]}`;
      }

      fs.access(rutaHistoricos, fs.constants.F_OK, errHist => {
        if (!errHist) {
          return abrirYCerrar(
            rutaHistoricos,
            "No se encontró en la ubicación normal, mostrando en Histórico."
          );
        }

        // 3) Fallback final: carpeta anterior
        console.log("No existe ni en principal ni en Histórico");
        const rutaAnterior = `${rutaBase}${lineaEncontrada[4]}\\${subcarpeta}`;
        abrirYCerrar(
          rutaAnterior,
          "No se encontró la carpeta de detalle ni en Histórico, mostrando carpeta anterior."
        );
      });
    });
  });
};


module.exports = { buscarOrden, buscarOM, copiarArchivo, buscarOrdenCv };
