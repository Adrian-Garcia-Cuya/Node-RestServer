import mongoose from "mongoose";

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_CNN);

        console.log('Base de datos online');


    }catch (error){
        throw new Error('Error al conectarse en la base de datos');
        
    }
}

export { dbConnection };