const express = require("express");
const passport = require("passport");
const tripRoutes = express.Router();
const User = require("../models/user-model")
const Trip = require("../models/trip-model");

//New route for home-user
// tripRoutes.get("/home-user", (req, res, next) => {
//   res.render("home-user/home-user");
// });

// Show the user
tripRoutes.get("/home-user", (req,res,next)=> {
  User.find()
  .then((userFromDb)=> {
  res.locals.userList = userFromDb;
  res.render("home-user/home-user")
  })
  .catch((err)=>{
        next(err)
  });
});


//New route for create-trip
tripRoutes.get("/create-trip", (req, res, next) => {
  res.render("home-user/create-trip");
});

tripRoutes.post("/create-trip", (req, res, next) => {
  const destination = req.body.destination;
  const departureDate = req.body.departureDate;
  const returnDate = req.body.returnDate;
  const departurePlace = req.body.departurePlace;
  const numberOfPeople = req.body.numberOfPeople;
  const type = req.body.type;
  const image = req.body.image; 

  if (destination === "") {
    res.render("home-user/home-user", { message: "Put a destination" });
    return;
  }

  // crypter message pour futur participants

  const newTrip = new Trip({
    destination,
    departureDate,
    returnDate,
    departurePlace,
    numberOfPeople,
    type, 
    image 
  });

  newTrip.save(err => {
    if (err) {
      res.render("home-user/home-user", { message: "Something went wrong" });
    } else {
      res.redirect("/final-trip");
    }
  });
});

//New route for final-trip
tripRoutes.get("/final-trip", (req, res, next) => {
  res.render("home-user/final-trip");
});

// details 
// tripRoutes.get("/final-trip", (req,res,next)=>{
//   if (!req.user){
//     res.flash("error", "you must be login")
//     res.redirect("/login")
//     return 
//   }
// Trip.find( {owner : req.user._id})
// // add the details of the owner 
// // .populate("owner")
// .then((tripFromDb)=>{
//   res.locals.tripList = tripFromDb;
//   res.render("home-user/final-trip")
// })

// .catch((err)=>{
//   next(err)
// })
// })

module.exports = tripRoutes;
