const passport = require("passport"); 

const User = require("../models/user-model");
const Trip = require("../models/trip-model");
// require new 
//DONT NEED ? 
require ("./google-strategy");




//serialize : what info will be store in the session ? 
passport.serializeUser((userDetails, done)=>{
  console.log("SERIALIZE ( Save to session)")
  // "null" in the 1st argument tells passport "no error occurred"
  done(null, userDetails._id);
}); 

//deserialize : how will we get the full user details ? 
passport.deserializeUser((idFromSession, done)=>{
  console.log("DESERIALIZE ( DETAILS from session)")
  User.findById(idFromSession)
  .then((userDetails)=>{
     // "null" in the 1st argument tells passport "no error occurred"
  done(null, userDetails);
  })
  .catch((err)=>{
    done(err);
  });
});

function passportSetup2(app){
  // add properties & methods to the "req" objects in routes
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req,res,next)=>{
    // make "res.user" accesible inside the hbs files as "blahuser"
    res.locals.tripUser =req.user; 
    next();
  })
}

//trip 
//serialize : what info will be store in the session ? 
passport.serializeUser((userDetails, done)=>{
  console.log("SERIALIZE ( Save to session)")
  // "null" in the 1st argument tells passport "no error occurred"
  done(null, userDetails._id);
}); 

//deserialize : how will we get the full user details ? 
passport.deserializeUser((idFromSession, done)=>{
  console.log("DESERIALIZE ( DETAILS from session)")
  Trip.findById(idFromSession)
  .then((userDetails)=>{
     // "null" in the 1st argument tells passport "no error occurred"
  done(null, userDetails);
  })
  .catch((err)=>{
    done(err);
  });
});

function passportSetup(app){
  // add properties & methods to the "req" objects in routes
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req,res,next)=>{
    // make "res.user" accesible inside the hbs files as "blahuser"
    res.locals.blahUser =req.user; 
    next();
  })
}

module.exports = passportSetup;