const express = require("express");
const router = express.Router();

const Restaurant = require("../models/restaurant-model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/resto/add", (req, res, next) => {
  res.render("resto-form");
});

router.post("/process-resto", (req, res, next) => {
  const { name, description, latitude, longitude } = req.body;
  const location = {
    type: "Point",
    coordinates: [latitude, longitude]
  };

  Restaurant.create({ name, description, location })
    .then(() => {
      res.redirect("final-trip");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/resto/data", (req, res, next) => {
  Restaurant.find()
    .then(restosFromDb => {
      res.json(restosFromDb);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
