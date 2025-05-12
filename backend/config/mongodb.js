import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.once('open', () => {
    console.log('DB Connected!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database Name:', mongoose.connection.name);
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

export default connectDB;
