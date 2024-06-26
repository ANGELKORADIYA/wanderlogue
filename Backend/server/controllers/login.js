const bcrypt = require("bcryptjs");
const {mongoose, } = require("mongoose");
const {MongoClient,ObjectId} = require("mongodb")
const jwt = require("jsonwebtoken");

const { loginModel, dealerModel, stockModel } = require("../models/schema");

// require('dotenv').config({ path: 'config.env' });
const DBurl =  process.env.DB_URL ||"mongodb+srv://koradiyaangel11:1234@quiz.73dex1f.mongodb.net/?retryWrites=true&w=majority";
const dbName= "wanderlogue";
const secretKey =  "ak25" ;
const PASSWORD_KEY = Number(12);

/*
signup takes :-
  password
  condirmpassword
  companyname
*/
module.exports.signup = async function (signup_data) {
  let mdbconnect = await mongoose.connect(DBurl, {
    dbName: dbName,
  });
  try {
    if (signup_data.password == signup_data.confirmpassword) {
      let check = await loginModel.findOne({ email: signup_data.email });
      if (check) {
        return {message:"There is existing email is there.",okk:false};
      } else {
        await loginModel.create({
          email: signup_data.email,
          password: await bcrypt.hash(signup_data.password, PASSWORD_KEY),
          user: signup_data.user,
        });
        return {message:"Signed up Succesfully",okk:true,};
      }
    } else {
      return {message:"password does not match",okk:false};
    }
  } catch(error){
    console.log(error)
  }finally {
    await mdbconnect.disconnect();
  }
};

module.exports.login = async (login_data, res) => {
  try {
    await mongoose.connect(DBurl, {
      dbName: dbName,
    });
    let check = await loginModel.findOne({ email: login_data.email });
    if (check && login_data.password!=''&&login_data.email!='') {
      let ress=await bcrypt.compare(login_data.password, check.password)
      console.log(ress)  
      if (ress) {
        // if (login_data.page == check.page) {
          let token = jwt.sign({ email: check._id }, secretKey);
          res.cookie("token", token, { maxAge: 1000000, httpOnly: true });
        return {token:token,okk:true,message:"Logined Succesfully"};
        // } else {
        // return "Not Acess";
        // }
      } else {
        return {message:"email or password is wrong",okk:false};
      }
    } else {
      return {message:"no email found",okk:false};
    }
  }catch(error){
    console.log(error)
  } finally {
    await mongoose.disconnect();
  }
};

module.exports.signout = async (req, res) => {
  try{
    res.cookie("token", "", { expires: new Date() }).json(`sign outed`);

  }catch(error){
    console.log(error)
  }finally {
    await mongoose.disconnect();
  }
};

//token = req.cookies.token
module.exports.valid = async (token) => {
  const client = new MongoClient(DBurl);
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log('Connected to MongoDB');
  
      // Specify the database and collection
      const database = client.db(dbName);
      const collection = database.collection('logins');
      
      const valid = jwt.verify(token, secretKey);
      // Replace 'your-document-id' with the actual ObjectId you want to find
      const projection = { _id: 0, password: 0 ,__v:0 };
      const result = await collection.findOne({_id:new ObjectId(valid.email)},{projection});
      if(result){

        return true
      }else{
        return false
      }
    } catch(error){
      console.log(error)
    }finally {
      // Close the connection when done
      await client.close();
      console.log('Disconnected from MongoDB');
    }
};

  module.exports.email =async (token)=> {
    const client = new MongoClient(DBurl);
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log('Connected to MongoDB');
  
      // Specify the database and collection
      const database = client.db(dbName);
      const collection = database.collection('logins');
      
      const valid = jwt.verify(token, secretKey);
      // Replace 'your-document-id' with the actual ObjectId you want to find
      const projection = { _id: 0, password: 0 ,__v:0 };
      const result = await collection.findOne({_id:new ObjectId(valid.email)},{projection});
      console.log(result);
      if (result){
        return result.email

      }
      else{
        return false
      }
    } catch(error){

      console.log(error)
      return false
    }finally {
      // Close the connection when done
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
