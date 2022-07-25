const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario')

const login = async(req, res) => {

    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / password incorrecto c'
            });
        }

        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / password incorrecto e'
            });
        }

        const validPassword = bcryptjs.compareSync(contraseña, usuario.contraseña);

        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / password incorrecto p'
            });
        }

        const token = await generarJWT( usuario.id );
        res.json({
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}