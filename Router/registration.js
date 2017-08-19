const express = require("express")
const router = express.Router();
const User = require("../models/Users")

router.get('/register', function(req, res){
  res.render("register")
})
router.post('/register', function(req, res){
  if (req.body.password === req.body.confirm){
    const user = new User();
    user.username = req.body.username
    user.password = req.body.password
    user.save()
    .then(function(user){
      req.session.userId = user._id
      res.redirect("/")
    })
    .catch(function(error){
      res.render("register",{
        error: error

      })
    })
  }else{
    let error_message= "print message";
    res.render("register", {
      error_message: error_message
    })
  }
})
module.exports = router;
