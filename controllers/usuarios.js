const usuariosGet = (req, res) => {
    const { query,
            nombre = 'No existe',
            page = 1,
            limit} = req.query;
    res.json({
        msg: 'Es una petición GET - controlador',
        query,
        nombre,
        page,
        limit
    });
}

const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'Es una petición POST - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'Es una petición PUT - controlador',
        id
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Es una petición PATCH - controlador'
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Es una petición DELETE - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}