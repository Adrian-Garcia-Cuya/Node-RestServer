import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
    }
});

const Role = model('Role', roleSchema);
export { Role };

