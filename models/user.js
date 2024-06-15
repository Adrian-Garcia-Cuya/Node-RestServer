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
        unique: true
    },
    password: {
        type: String,
        required: [function(){
            return !this.google
        }, 'La contrasena es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

//Sobreescribiendo el metodo 'toJSON'
userSchema.methods.toJSON = function() {
    //toObject -> retorna la representacion de un documento de Mongoose (instancia de un modelo) en un objeto javascript
    const { __v, password, _id,...user } = this.toObject();

    user.uid = _id;

    return user;
}

// 'model' -> crea y retorna un modelo(clase) segun las especificaciones dadas en sus argumento.
//Parametros:
//1. Nombre del modelo
//2. Estructura/Esquema que tendra el modelo.
const User =  model('User', userSchema);
export { User };