const express = require("express");
const passport = require("passport");
const activityRoutes = express.Router();
const User = require("../models/user-model");
const Activity = require("../models/activity-model");
const router = express.Router();

//Routes

// cf EXO LIBRARY

router.get("/final-trip", (req, res, next) => {
  console.log("titi");
  Activity.find()
    .populate("trip")
    .then(activitiesfromDb => {
      res.locals.activityList = activitiesfromDb;
      res.render("process-activity");
    })
    .catch(err => {
      next(err);
    });
});

router.post("process-activity", (req, res, next) => {
  const {
    typeOfActivity,
    nameOfActivity,
    activityDetail,
    priceOfActivity
  } = req.body;

  Activity.create({
    typeOfActivity,
    nameOfActivity,
    activityDetail,
    priceOfActivity
  })
    .then(() => {
      res.redirect("/final-trip");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/final-trip/:activitiesId", (req, res, next) => {
  console.log("titi");
  res.locals.activitiesId = req.params.activitiesId;
  res.render("final-trip");
});

// activityRoutes.post("/process-activity", (req, res, next) => {
//   console.log("activity");
//   const {
//     typeOfActivity,
//     nameOfActivity,
//     activityDetail,
//     priceOfActivity
//   } = req.body;
//   Activity.create({
//     typeOfActivity,
//     nameOfActivity,
//     activityDetail,
//     priceOfActivity,
//     trip: req.trip._id
//   })
//     .then(() => {
//       res.redirect("final-trip");
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// activityRoutes.get("/final-trip", (req, res, next) => {
//   console.log(req.params.activityId);
//   Activity.find({ owner: req.trip._id })
//     .then(activityfromDb => {
//       console.log(req.param.activityId);
//       res.locals.activityList = activityfromDb;
//       res.render("home-user/final-trip");
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = activityRoutes;
