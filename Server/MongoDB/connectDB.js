import mongoose from 'mongoose';

const connectDB = (uri) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(uri).then(() => console.log('MongooseDB connected')).catch((e) => console.log(e));
    return;
}

export default connectDB;