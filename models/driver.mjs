import mongoose from 'mongoose';
import PointSchema from './point.mjs';

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

export default Driver;