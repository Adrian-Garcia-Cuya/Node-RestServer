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

categorySchema.methods.toJSON = function(){

    const { __v, state, ...category } = this.toObject();

    return category;
}

const Category = model('Category', categorySchema);
export { Category };


