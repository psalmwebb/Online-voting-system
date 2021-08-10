const express = require("express");
const conn = require("./conn")

const app = express();

const passport = require("passport");

const path = require("path");

const cookieParser = require("cookie-parser");

const {cookieManager} = require("./middlewares/auth.middleware");

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"static")))
app.use(cookieParser());
app.use(cookieManager());
app.use(passport.initialize());
app.use(passport.session());



app.use(require("./routes/auth.routes"),require("./routes/main.route"));

app.use("/create",require("./routes/sub.routes"));



conn(app);