const express = require("express");
const passport = require("passport");
const tripRoutes = express.Router();
const User = require("../models/user-model");
const Trip = require("../models/trip-model");
const Activity = require("../models/activity-model");

// NODEMAILER
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_user,
    pass: process.env.gmail_pass
  }
});

// New route for home-user
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
    typeOfTrip,
    imageUrl
  } = req.body;

  Trip.create({
    destination,
    departureDate,
    returnDate,
    departurePlace,
    numberOfPeople,
    typeOfTrip,
    imageUrl,
    owner: req.user._id
  })
    .then(() => {
      res.flash("success", "Trip Created!");
      res.redirect("/home-user");
    })
    .catch(err => {
      next(err);
    });
});

/////////// DEJA Commentédd

//New route for final-trip
tripRoutes.get("/final-trip/:tripId", (req, res, next) => {
//     //must be connected

//   // if (!req.user){
//   //   res.flash("error", "you must be login")
//   //   res.redirect("/login")
//   //   return
//   // }

  Activity.find({trip:req.params.tripId })
  //later
  // .populate("Trip")
  // add the details of the owner
  // .populate("owner")
  .then(activityFromDb => {
    res.locals.activityList = activityFromDb;
    res.locals.tripId = req.params.tripId;

    res.render("home-user/final-trip");
   

  })

  .catch(err => {
    next(err);
  });
});
//  // ACTIVITY SUITE
tripRoutes.post("/process-activity/:tripId", (req, res, next) => {
    const {
      typeOfActivity,
      activityDetail,
      name, 
      latitude,
      longitude
    } = req.body;
    const nameOfActivity = {
      coordinates: [ latitude, longitude ]};
    const trip = req.params.tripId
    Activity.create({
      typeOfActivity,
      nameOfActivity,
      name,
      activityDetail,
      trip
    })
      .then(() => {
        res.redirect("/final-trip/" + trip);
      })
      .catch(err => {
        next(err);
      });
  });
  

  // SHOW THE SEED 

/////////////// activity import 
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
//// NODEMAILER 
tripRoutes.get("/invit/:tripId", (req,res, next)=>{
  var trip = req.params.tripId
  console.log(trip)
  res.render('home-user/invit');
});




//POST 
tripRoutes.post("/email-trip" , (req, res, next)=>{
 
  const {emailFriend} =req.body
  var trip = req.params.tripId
transport.sendMail({
  from :process.env.gmail_user,
  to: emailFriend,
  subject: "Join a Trip",
  text: `Hello,
  One of your friends invit you to join a Trip,
  Please use this link to join his group :  
  http://localhost:3000/final-trip/{{this._id}}`,
  html: `<h1>Hello</h1>
  <p>One of your friends invit you to join a Trip, <br>
  Please use this link to join his group : <br>
  <a href="http://localhost:3000/final-trip/{{this._id}}">Confirm</a></p>`
})
.then (()=>{
res.redirect('/home-user')
})
.catch((err)=>{
  next(err)
});
});

//

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


// DELETE AN ACTIVITY
tripRoutes.get("/final-trip/:tripId/:activityId/delete", (req, res, next) => {
  Activity.findByIdAndRemove(req.params.activityId)
    .then(() => {
      var trip = req.params.tripId
      res.redirect("/final-trip/" + trip);
    })
    .catch(err => {
      next(err);
    });
});
// MESSAGE REVIEW IN THE GROUP TRIP // WORKSSSSSSSS
tripRoutes.post('/process-review/:tripId', (req,res,next)=>{
  const {user, comments,imgUrl}= req.body;
Trip.findByIdAndUpdate(
  req.params.tripId,
  {
    $push: {
      reviews: { user, comments,imgUrl}}
    },
  {runValidators : true}
)
.then(()=>{
  res.redirect(`/final-trip/${req.params.tripId}`);
})
.catch((err)=>{
  next(err)
})
});





// GOOGLE MAPS TEST  works !! 

tripRoutes.get("/act/data", (req, res, next) => {
  Activity.find()
    .then((tripFromDb) => {
      res.json(tripFromDb);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = tripRoutes;
