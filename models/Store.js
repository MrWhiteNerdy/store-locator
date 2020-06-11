const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, 'Please add a store ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store ID must be less than 10 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

storeSchema.pre('save', async function(next) {
  const location = await geocoder.geocode(this.address);
  const { longitude, latitude, formattedAddress } = location[0];
  this.location = {
    type: 'Point',
    coordinates: [longitude, latitude],
    formattedAddress: formattedAddress
  };

  this.address = undefined;
  next();
});

module.exports = mongoose.model('Store', storeSchema);
