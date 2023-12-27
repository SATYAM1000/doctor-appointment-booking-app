import mongoose from 'mongoose';

const imageSchema=mongoose.Schema({
    userID:{
        type:String,
    },
    docotorID:{
        type:String,
    },
    image:{
        type:String,
    }
})

const Image=new mongoose.model('images',imageSchema);
export default Image;