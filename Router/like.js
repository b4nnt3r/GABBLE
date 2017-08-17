const express = require("express");
const router = express.Router();
const message = require("../models/Message")

router.post("/message/:id/like", function(req, res){
  message.findOne({_id: req.params.id})
  .then(function(Like){

    if (Like.user_like.length == 0){
      console.log("First Like");
      Like.user_like.push({
        username: req.user.username
      });
      Like.totalLikes +=1;
      Like.save()
      .then(function(_redirect){
        res.redirect('/')
      })
    }else{
      let like_existed = true;

      for (var i = 0; i < Like.user_like.length; i++) {
        console.log(Like.user_like[i].username);
        if (Like.user_like[i].username === req.user.username){
          like_existed = false;
          console.log(like_existed);
        }
      }
      if (like_existed == true){
        Like.user_like.push({
          username: req.user.username,
        })
        Like.totalLikes +=1
        Like.save()
        .then(function(_redirect){
          res.redirect('/')
        })
      }else{
        res.redirect('/')
      }
    }
  })
})

router.get('/message/:id/user',function(req,res){
  message.findOne({_id: req.params.id})
  .then(function(like){
    let like_length = like.user_like.length;
    let users_like =[]
    if (like_length > 0){
      for (var i = 0; i < like_length; i++) {
        users_like.push(like.user_like[i].username)
      }
      res.render('user_like',{
        users_like: users_like
      })
    }else{
      res.render('user_like')
    }
  })
})
module.exports = router;
