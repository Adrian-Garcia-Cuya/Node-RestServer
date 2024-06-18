import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
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
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

productSchema.methods.toJSON = function(){

    const { __v, state, user,...product } = this.toObject();

    return product;
}

const Product = model('Product', productSchema);
export { Product };