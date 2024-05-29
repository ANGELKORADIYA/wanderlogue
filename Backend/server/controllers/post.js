const { mongoose } = require("mongoose");

const { postModel } = require("../models/schema");


require('dotenv').config({ path: 'config.env' });
const DBurl =  process.env.DB_URL ||"mongodb+srv://koradiyaangel11:1234@quiz.73dex1f.mongodb.net/?retryWrites=true&w=majority";
const dbName= "wanderlogue";
const secretKey = process.env.SECRET_KEY || 1290 ;
const PASSWORD_KEY = Number(process.env.PASSWORD_KEY||"ak25");

module.exports.createpost = async function (data, email) {
  try {
    await mongoose.connect(DBurl, { dbName: dbName });
    console.log("Connected to MongoDB");

    const existingEmail = await postModel.findOne({ email });
    if (!existingEmail) {
      let v = await postModel.create({ email, posts: data });
      await v.save();
      return { message: "Updated Sucessfully", okk: true };
    }
    if (!existingEmail.posts || existingEmail.posts.length === 0) {
      // If the user has no existing posts, create a new post for them
      existingEmail.posts = [data];
    } else {
      // If the user has existing posts, push the new post data
      existingEmail.posts.push(data);
    }
    await existingEmail.save();
    await mongoose.disconnect();
    return { message: "Updated Sucessfully", okk: true };
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    // Introduce a delay of 1 second (1000 milliseconds)
    // await new Promise(resolve => setTimeout(resolve, 1000));
  }
};
module.exports.myposts = async function (data, email) {
  let client;
  try {
    client = await mongoose.connect(DBurl, { dbName: dbName });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000); // Wait for 2 seconds
    console.log("Connected to MongoDB");

    const existingDashboard = await postModel.findOne(
      { email: email },
      { __v: false, _id: false }
    );

    await client.disconnect();
    return existingDashboard.posts;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    if (client) {
      await client.disconnect();
    }
  }
};
module.exports.fetchposts = async function () {
  let client;
  try {
    client = await mongoose.connect(DBurl, { dbName: dbName });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000); // Wait for 2 seconds
    console.log("Connected to MongoDB");

    let randomEmails = await postModel.aggregate([
      { $sample: { size: 5 } }, // Fetch 5 random documents
      {
        $project: {
          email: 1,
          _id: 0,
          posts: {
            $arrayElemAt: [
              "$posts",
              {
                $floor: {
                  $multiply: [
                    { $rand: {} }, // Generate a random number between 0 and 1
                    { $size: "$posts" }, // Get the size of the posts array
                  ],
                },
              },
            ],
          },
        },
      }, // Project email and a random post from the posts array
    ]);

    randomEmails.forEach((post) => {
      post.posts.email = post.email;
      delete post.email;
      post.posts = [post.posts];
    });

    console.log(randomEmails);
    return randomEmails;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    await client.disconnect();
  }
};

