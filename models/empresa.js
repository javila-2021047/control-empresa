const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal'
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']

    },
    estado: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: String,
        required: true,
        default: ['anonima']
    }
});


module.exports = model('Empresa', EmpresaSchema);