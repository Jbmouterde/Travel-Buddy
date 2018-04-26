const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  //schema fields
  typeOfActivity: { 
    type: String,
    enum : ["restaurant","hotel","culture","sport"]
  },
  nameOfActivity: {
    type: { type: String },
    coordinates: [
      { type: Number }
    ]
  },
  name: { type: String },
  activityDetail: { type: String },
  priceOfActivity: { type: Number },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
  
    
  }
  // restaurant
  //    { type: String },
  // culture: { type: String },
  // visit: { type: String },
  // bar: { type: String },
  // chill: { type: String },
  // trip : {type : String}
});



activitySchema.index({ location: "2dsphere" });

activitySchema.virtual("isCulture").get(function(){
  return this.typeOfActivity === "culture";
 });

 activitySchema.virtual("isRestaurant").get(function(){
  return this.typeOfActivity === "restaurant";
 });

 activitySchema.virtual("isHotel").get(function(){
  return this.typeOfActivity === "hotel";
 });

 activitySchema.virtual("isSport").get(function(){
  return this.typeOfActivity === "sport";
 });

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
