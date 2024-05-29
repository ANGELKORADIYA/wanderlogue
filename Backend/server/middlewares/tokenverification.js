const { valid ,email} = require("../controllers/login");

async function tokenverification(req, res, next) {
  try {
    const v = await email(req.headers.token);
    if (v === false) {
      res.status(401).json("wrong token");
    } else {
      // res.cookie("token", "", { expires: new Date() })
      req.email=v
      next()
    }
    
  } catch (error) {
    console.log("tokenverification" , error);
  }
}

module.exports.tokenverification = tokenverification;
