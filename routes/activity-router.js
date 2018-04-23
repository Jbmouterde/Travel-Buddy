const express = require("express");
const passport = require("passport");
const activityRoutes = express.Router();
const User = require("../models/user-model");
const Activity = require("../models/activity-model");

//Routes

activityRoutes.post("/process-activity", (req, res, next) => {
  console.log("activity");
  const { restaurant, culture, visit, bar, chill } = req.body;
  Activity.create({ restaurant, culture, visit, bar, chill })
    .then(() => {
      res.redirect("final-trip");
    })
    .catch(err => {
      next(err);
    });
});

activityRoutes.get("/final-trip", (req, res, next) => {
  console.log(req.param.activityId);
  Activity.findById(req.params.activityId)
    .then(activityfromDb => {
      console.log(req.param.activityId);
      res.locals.activityList = activityfromDb;
      res.render("home-user/final-trip");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = activityRoutes;
