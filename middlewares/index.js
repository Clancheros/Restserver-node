const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-rolers');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
}