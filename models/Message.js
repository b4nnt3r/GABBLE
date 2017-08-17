const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const messageSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  username: {type: String, required: true},
  totalLikes: {type: Number, default: 0},
  createAt: {type: Date, required: true},
  user_like: [{
    username: {type: String, required: true}
  }]
})
messageSchema.plugin(timestamps);
const Message = mongoose.model('Messsage', messageSchema);
module.exports = Message;
