const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restoSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    location: {
      type: { type: String },
      coordinates: [{ type: Number }]
    }
  },
  {
    timestamps: true
  }
);

restoSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restoSchema);

module.exports = Restaurant;
