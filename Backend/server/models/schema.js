const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  user: String,
  email: String,
  password: String,
});
//companyname => usetype
//canceled page

const postSchema = new mongoose.Schema({
  email: String,
  posts: Array,
});




const loginModel = mongoose.model("login", loginSchema);

module.exports.loginModel = loginModel;

const postModel = mongoose.model("post", postSchema);

module.exports.postModel= postModel;