import mongoose from "mongoose";

const poiSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  }
});

const Poi = mongoose.model("Poi", poiSchema);

export default Poi;
