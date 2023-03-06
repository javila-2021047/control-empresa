const { Router } = require('express');
const { check } = require('express-validator');
const { getSucursalPorID, postSucursal, putSucursal, deleteSucursal, getSucursales } = require('../controllers/sucursal');
const { existeEmpresaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', getSucursales);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], getSucursalPorID);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'El nombre es obligatorio').not().isEmpty(),
    check('empresa').custom(existeEmpresaPorId),
    validarCampos
], postSucursal);

router.put('/editar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putSucursal);

router.delete('/eliminar', [
    validarJWT,
    validarCampos
], deleteSucursal);

module.exports = router;