const mongoose = require("mongoose");

const Activity = require("../models/activity-model");

const Trip = require("../models/trip-model");

mongoose.Promise = Promise;
mongoose
  .connect("mongodb://localhost/project2", { useMongoClient: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const activities = [
  {
    typeOfActivity: "Eating",
    nameOfActivity: "Dining",
    activityDetail: "Going out",
    priceOfActivity: "",
    trip: {
      destination: "Bali",
      departureDate: new Date(1910, 10, 08),
      returnDate: new Date(1919, 10, 12),
      departurePlace: "Paris",
      numberOfPeople: 1,
      type: "bat",
      description: "oaa",
      imageUrl: "",
      owner: "5addb80d2399fa0eaba79457"
    }
  },
  {
    typeOfActivity: "Visiting",
    nameOfActivity: "Tourism",
    activityDetail: "Cultural Places",
    priceOfActivity: "",
    trip: {
      destination: "Lyon",
      departureDate: new Date(1910, 10, 08),
      returnDate: new Date(1919, 10, 12),
      departurePlace: "Paris",
      numberOfPeople: 1,
      type: "bat",
      description: "oaa",
      imageUrl: "",
      owner: "5addb80d2399fa0eaba79457"
    }
  }
];

activities.forEach(oneActivity => {
  Trip.create(oneActivity.trip)
    //Author success callback
    .then(tripDetails => {
      console.log(`Created Trip ${tripDetails.destination}`);
      //change 'author' to be ObjectId
      oneActivity.trip = tripDetails._id;
      // Book.create(oneBook)
      // const bookPromise = Book.create(oneBook);
      //return bookPromise;

      //return the promise object for BOOK create
      return Activity.create(oneActivity);
    })
    //BOOK success callback
    .then(() => {
      console.log(`Created Activity ${oneActivity.nameOfActivity}`);
    })
    //AUTHOR & BOOK error callback
    .catch(err => {
      console.log(
        "Error creating Activity ${oneActivity.nameOfActivity} or Trip"
      );
    });
});
