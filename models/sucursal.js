const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El rol es obligatorio'],
        unique: true
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref: 'Empresa', 
        required: true
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio'],
        unique: true,
    },
    direccion: {
        type: String,
        required: [true, 'la direccion es obligatorio'],
        unique: true,
    },
    estado:{
        type:Boolean,
        default: true,
        require: true
    }

});

module.exports = model('Sucursal', SucursalSchema);