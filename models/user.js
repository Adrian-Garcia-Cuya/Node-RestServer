import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    }

});

// 'model' -> crea y retorna un modelo(clase) segun las especificaciones dadas en sus argumento.
//Parametros:
//1. Nombre del modelo
//2. Estructura/Esquema que tendra el modelo.
export default model('User', userSchema);