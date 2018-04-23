const express = require("express");
const passport = require("passport");
const tripRoutes = express.Router();
const User = require("../models/user-model");
const Trip = require("../models/trip-model");

//New route for home-user
// tripRoutes.get("/home-user", (req, res, next) => {
//   res.render("home-user/home-user");
// });

// Show the user
tripRoutes.get("/home-user", (req, res, next) => {
  //must be connected
  // if (!req.user){
  //   res.flash("error", "you must be login")
  //   res.redirect("/login")
  //   return
  // }
  // User.find()
  // .then((userFromDb)=> {
  // res.locals.userList = userFromDb;
  // res.render("home-user/home-user")
  // })
  // .catch((err)=>{
  //       next(err)
  // });
  //
  Trip.find({ owner: req.user._id })
    // add the details of the owner
    // .populate("owner")
    .then(tripFromDb => {
      res.locals.tripList = tripFromDb;
      res.render("home-user/home-user");
    })

    .catch(err => {
      next(err);
    });
});

//New route for create-trip
tripRoutes.get("/create-trip", (req, res, next) => {
  //must be connected

  // if (!req.user){
  //   res.flash("error", "you must be login")
  //   res.redirect("/login")
  //   return
  // }
  res.render("home-user/create-trip");
});
////////////
// post create
// tripRoutes.post("/create-trip", (req, res, next) => {
//   const destination = req.body.destination;
//   const departureDate = req.body.departureDate;
//   const returnDate = req.body.returnDate;
//   const departurePlace = req.body.departurePlace;
//   const numberOfPeople = req.body.numberOfPeople;
//   const type = req.body.type;
//   const image = req.body.image;

//   if (destination === "") {
//     res.render("home-user/home-user", { message: "Put a destination" });
//     return;
//   }

//   // crypter message pour futur participants

//   const newTrip = new Trip({
//     destination,
//     departureDate,
//     returnDate,
//     departurePlace,
//     numberOfPeople,
//     type,
//     description,
//     image
//   });

//   newTrip.save(err => {
//     if (err) {
//       res.render("home-user/home-user", { message: "Something went wrong" });
//     } else {
//       res.redirect("/final-trip");
//     }
//   });
// });
/////////////
//TEST
///////////
tripRoutes.post("/create-trip", (req, res, next) => {
  if (!req.user) {
    res.flash("error", "you must be login");
    res.redirect("/login");
    return;
  }
  const {
    destination,
    departureDate,
    returnDate,
    departurePlace,
    numberOfPeople,
    type
  } = req.body;

  Trip.create({
    destination,
    departureDate,
    returnDate,
    departurePlace,
    numberOfPeople,
    type,
    owner: req.user._id
  })
    .then(() => {
      res.flash("success", "Trip Created!");
      res.redirect("/final-trip");
    })
    .catch(err => {
      next(err);
    });
});

/////////// DEJA Commenté
//New route for final-trip
// tripRoutes.get("/final-trip", (req, res, next) => {
//     //must be connected

//   // if (!req.user){
//   //   res.flash("error", "you must be login")
//   //   res.redirect("/login")
//   //   return
//   // }
//   res.render("home-user/final-trip");
// });
///////////////
////////////////// Vivian
// test import info final trip

// tripRoutes.get("/final-trip", (req, res, next) => {
//   //must be connected
//   // if (!req.user){
//   //   res.flash("error", "you must be login")
//   //   res.redirect("/login")
//   //   return
//   // }
//   Trip.find({ owner: req.user._id })
//     // add the details of the owner
//     // .populate("owner")
//     .then(tripFromDb => {
//       res.locals.tripList = tripFromDb;
//       res.render("home-user/final-trip");
//     })

//     .catch(err => {
//       next(err);
//     });
// });

///////////////////////// Vivian
// UPDATE THE TRIP
tripRoutes.get("/trips/:tripId/edit", (req, res, next) => {
  Trip.findById(req.params.tripId)
    .then(tripDetails => {
      res.locals.tripId = req.params.tripId;
      res.locals.trip = tripDetails;
      res.render("home-user/update-trip");
    })
    .catch(err => {
      next(err);
    });
});

//update trip step 5
tripRoutes.post("/update-trip/:tripId", (req, res, next) => {
  // res.send(req.body);
  const { destination } = req.body;
  Trip.findByIdAndUpdate(
    req.params.tripId, // which document to update
    { destination }, // what changes to make
    { runValidators: true } // extra settings
  )
    .then(() => {
      res.redirect(`/home-user`);
    })
    .catch(err => {
      next(err);
    });
});

/////////
// DELETE A TRIP
tripRoutes.get("/trips/:tripId/delete", (req, res, next) => {
  Trip.findByIdAndRemove(req.params.tripId)
    .then(() => {
      res.redirect("/home-user");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = tripRoutes;