const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { tokenverification } = require("./middlewares/tokenverification");
const { route_login } = require("./routes/route_login");
const { route_post } = require("./routes/route_post");


const baseUrl = "http://localhost:8383";
const port = 8383;

app.use(express.json({ limit: '10mb' }));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/',route_login)
app.use(tokenverification)
app.use('/post',route_post)


app.listen(port, () => {
  console.log(`Server is Running on ${baseUrl} at ${port}`);
});
