import  mongoose, { Schema, model } from  "mongoose";


const adminSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true}, 
    username: {type: String, required: true },
    razorpayid: {type: String},
    razorpaysecret: {type: String},
});

export  default mongoose.models.Admin || model('Admin', adminSchema); 