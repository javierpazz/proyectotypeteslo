/*
    Event Routes
    /api/products
*/
const { Router } = require('express');
const { check } = require('express-validator');

// const { isDate } = require('../helpers/isDate');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
const { getProducts, getProductsByGener } = require('../controllers/products');

const router = Router();

// Todas tienes que pasar por la validación del JWT
// router.use( validarJWT );


// Obtener productos
router.get('/', getProducts );



module.exports = router;