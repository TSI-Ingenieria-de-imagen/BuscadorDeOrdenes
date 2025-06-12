const { Router } = require("express");
const router = Router();
const buscarCtrl = require("../controller/buscar.controller");

router.post("/buscar-of/:numeroOF", buscarCtrl.buscarOrden); 

// router.post('/buscar-om/:numeroOM', buscarCtrl.buscarOM);

router.post('/buscar-om/:numeroOF', buscarCtrl.buscarAviso);

router.post('/copiarArchivo', buscarCtrl.copiarArchivo);


module.exports = router;
