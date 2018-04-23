const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  //schema fields
  restaurant: { type: String },
  culture: { type: String },
  visit: { type: String },
  bar: { type: String },
  chill: { type: String },
  trip : {type : String}
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
