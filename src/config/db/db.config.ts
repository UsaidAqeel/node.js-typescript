import mongoose from 'mongoose';
import { MONGO_URI } from '../../constant';

mongoose.Promise = global.Promise;
export const dbConnect = (): void => {
  mongoose.connect(MONGO_URI, {});
  const connection = mongoose.connection;
  connection.once('open', function () {
    console.log(
      '********** MongoDB database connection established successfully! **********',
    );
  });
};