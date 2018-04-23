const express = require("express"); 

const User = require("../models/user-model")

const router = express.Router();



router.get("/admin/users", (req,res,next)=>{
  // if not log in or not admin
  if(!req.user || req.user.role !== "Boss"){
    //next without error go straight to the 404 
    next();
    return 
  }

User.find()
.then((usersFromDb)=>{
res.locals.userList = usersFromDb;
res.render("admin-views/user-list-page");
})

.catch((err)=>{
  next(err)
})
});


// DELETE OTHER USER 
// PART 1 

router.get('/admin/users/:usersId/delete', (req,res,next)=>{
  User.findByIdAndRemove(req.params.usersId)
  .then(()=>{
    res.redirect('/admin/users')
  })
  .catch((err)=>{
    next(err)
  })
})




//----------------------
module.exports = router; 