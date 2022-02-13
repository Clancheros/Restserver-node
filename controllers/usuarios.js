const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const query = { estado: true };

const usuariosGet = async(req, res) => {
    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, contraseña, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, contraseña, rol} );

    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync( contraseña, salt );

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res) => {
    const id = req.params.id;
    const { _id, contraseña, google, correo, ...resto} = req.body;

    if( contraseña ){
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync( contraseña, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Es una petición PATCH - controlador'
    });
}

const usuariosDelete = async(req, res) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}