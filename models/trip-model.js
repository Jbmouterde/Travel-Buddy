const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    destination: { type: String },
    departureDate: { type: Date },
    returnDate: Date,
    departurePlace: { type: String },
    numberOfPeople: { type: Number },
    type: { type: String },
    description: { type: String }, 
    // image : {type : String}, 
    // owner : {
    //   type : Schema.Types.ObjectId, 
    //   ref : "User", 
    //   required : true
    // }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
