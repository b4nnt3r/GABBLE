const express = require("express");
const router = express.Router();
const message = require("../models/Message")

router.get('/',function(req,res){
  message.find().sort({"createAt": "desc"})
  .then(function(messages){
    res.render("homepage",{
      messages: messages,
      user: req.user
    })
  })
})

router.get('/about',function(req,res){
  res.render("about")
})
module.exports = router;
