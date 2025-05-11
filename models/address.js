import  mongoose, { Schema, model } from  "mongoose";


const addressSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String},
    mobileNo: {type: String, required: true}, 
    pinCode: {type: String, required: true },
    addressLine1: {type: String, required: true },
    addressLine2: {type: String, required: true },
    city: {type: String, required: true},
    state: {type: String, required: true},
    addressType: {type: String},
},
{ timestamps: true } // Automatically adds createdAt and updatedAt
);

export  default mongoose.models.Address || model('Address', addressSchema); 