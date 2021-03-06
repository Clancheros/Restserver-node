const { Router } = require('express');
const { check } = require('express-validator');

const {
        validarCampos,
        validarJWT,
        esAdminRol,
        tieneRol
} = require('../middlewares')

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosDelete, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(  existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmail(),
        check('contraseña', 'La contraseña debe de ser más de 6 letras').isLength({ min:6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost);

router.delete('/:id', [
        validarJWT,
        tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
        esAdminRol,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(  existeUsuarioPorId ),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router