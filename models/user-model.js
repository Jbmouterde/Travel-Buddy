const mongoose =require("mongoose");

const Schema = mongoose.Schema; 

const userSchema = new Schema({
  // schema fields 
  firstName: { type: String },
  name: { type: String },
  username: String,

  // fullName : {type : String, required : true}, 
  email : {type : String, required : true, unique : true}, 

  // role : {
  //   type : String, 
  //   enum : ["Boss", "Developper", " TA"], 
  //   default : "Developper"
  // },
  // normal sign up and log in 
  imageName: { type: String },
  imageUrl: { type: String },
  googleID : { type : String},
  encryptedPassword :  {type : String },
}, 
{
  timestamps: true
});

//FOR LATER 

// fake from layout 
// define the "isAdmin" fake property
// Can't be an arrow function because it uses this
userSchema.virtual("isBoss").get(function(){
 return this.role === "Boss";
});

const User = mongoose.model("User", userSchema); 

module.exports = User; 