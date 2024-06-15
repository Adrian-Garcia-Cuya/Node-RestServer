import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'La categoria es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Category = model('Category', categorySchema);
export { Category };


