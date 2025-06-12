const { Router } = require("express");
const router = Router();
const buscarCtrl = require("../controller/buscar.controller");

// router.get("/buscar-of/:numeroOF", buscarCtrl.buscarOrden);
router.post("/buscar-of/:numeroOF", buscarCtrl.buscarOrden); 
router.post('/buscar-om/:numeroOM', buscarCtrl.buscarOM);
router.post('/copiarArchivo', buscarCtrl.copiarArchivo);
// router.post("/buscar-orden-cv/:numeroOF", buscarCtrl.buscarOrdenCv);

// router.post("/buscar-ofall/:numeroOF", buscarCtrl.buscarOrdenAll); 



module.exports = router;
