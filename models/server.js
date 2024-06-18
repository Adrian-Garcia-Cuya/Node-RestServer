import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { router as UserRouter } from '../routes/users.js';
import { router as AuthRouter } from '../routes/auth.js';
import { router as CategoriesRouter } from '../routes/categories.js';
import { router as ProductRouter } from '../routes/products.js';
import { router as SearchRouter } from '../routes/searches.js';
import { router as UploadsRouter } from '../routes/uploads.js';

import { dbConnection } from '../database/config.js';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'
        }
        

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

        //File-upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        this.app.use(this.paths.auth, AuthRouter);
        this.app.use(this.paths.users, UserRouter);
        this.app.use(this.paths.categories, CategoriesRouter);
        this.app.use(this.paths.products, ProductRouter);
        this.app.use(this.paths.search, SearchRouter);
        this.app.use(this.paths.uploads, UploadsRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port)
        });
    }
}

export { Server };