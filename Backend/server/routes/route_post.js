const express = require("express");
const route_post = express.Router();
const { myposts, createpost,fetchposts } = require("../controllers/post");
const path = require("path");


route_post.post("/createpost", async (req, res) => {
    let success = await createpost(req.body,req.email); 

    res.status(200).json(success);
    
});
route_post.post("/myposts", async (req, res) => {
  let success = await myposts(req.body,req.email);
  res.status(200).json(success);


});

route_post.post('/fetch-posts', async (req, res) => {
    let success = await fetchposts()
    res.status(200).json(success);

});
module.exports.route_post = route_post
