const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {
    const query = { estado: true };
    const listaempresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);
    res.json({
        msg: 'Controlador Empresa',
        listaempresas
    });
}

const postEmpresa = async (req = request, res = response) => {
    const { nombre, correo, password, tipo, sucursal } = req.body;
    const empresaGuardadoDB = new Empresa({ nombre, correo, password, tipo, sucursal});
    const salt = bcrypt.genSaltSync();
    empresaGuardadoDB.password = bcrypt.hashSync(password, salt);
    await empresaGuardadoDB.save();
    res.json({
        msg: 'Insertar Empresa',
        empresaGuardadoDB
    });
}


const putEmpresa = async (req = request, res = response) => {
    const id = req.empresa.id;
    const { _id, tipo,  estado, ...resto } = req.body;
    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }
    const empresaEditado = await Empresa.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'editar empresa',
        empresaEditado
    });
}

const deleteEmpresa = async(req = request, res = response) => {
    const id = req.empresa.id;
     const empresaEliminado = await Empresa.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'eliminar empresa',
        empresaEliminado
    });
}

module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}





