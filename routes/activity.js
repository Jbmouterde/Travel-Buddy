const express = require("express");
const passport = require("passport");
const activityRoutes = express.Router();
const User = require("../models/user-model");
const Activity = require("../models/activity-model");

module.exports = activityRoutes;
