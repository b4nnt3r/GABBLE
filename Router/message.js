const express = require("express");
const router = express.Router();
const Message = require("../models/Message")

router.get('/message/new',function(req, res){
  res.render("message")
})
router.post('/message/new', function(req, res){
  const message = new Message()
  message.title = req.body.title
  message.body = req.body.body
  message.username = req.user.username
  message.createAt = Date.now()
  message.save()
  .then(function(link){
    res.redirect("/")
  })
  .catch(function(error){
    console.log("MESSAGE ERROR");
    res.render("message", {
      error: error
    })
  })
})

router.post('/message/:id/delete', function(req,res){
  Message.findOne({_id: req.params.id, username: req.user.username })
  .then(function(msg){
    msg.remove()
    .then(function(){
      res.redirect('/')
    })
  })
  .catch(function(error){
    res.redirect('/')
    res.status(422).send("unauthorized to delete this message")
  })
})
module.exports = router;
