import express from 'express';
import cors from 'cors';
import { router } from '../routes/users.js';
import { dbConnection } from '../database/config.js';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsers = '/api/users';

        //Conexion a la base de datos
        this.conectionDB();

        //Middlewares
        this.middlewares();

        this.routes();
    }

    async conectionDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio public
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.pathUsers, router);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port)
        });
    }
}

export { Server };