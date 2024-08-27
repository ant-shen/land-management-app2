const mongoose = require('mongoose');

const LandHoldingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  legalEntity: {
    type: String,
    required: true,
  },
  netMineralAcres: {
    type: Number,
    required: true,
  },
  mineralOwnerRoyalty: {
    type: Number,
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  township: {
    type: String,
    required: true,
  },
  range: {
    type: String,
    required: true,
  },
  titleSource: {
    type: String,
    enum: ['Class A', 'Class B', 'Class C', 'Class D'],
    required: true,
  },
});

module.exports = mongoose.model('LandHolding', LandHoldingSchema);
