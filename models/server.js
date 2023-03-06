//Importaciones de nodejs
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
         
        this.app = express();
        this.port = process.env.PORT;
        
        
        this.paths = {
            auth: '/api/auth',
            sucursales: '/api/sucursal',
            empresas: '/api/empresa'
        }

        this.conectarDB()
        this.middlewares();
        this.routes();

    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth')); 
        this.app.use(this.paths.sucursales, require('../routes/sucursal'));
        this.app.use(this.paths.empresas, require('../routes/empresa'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

module.exports = Server;