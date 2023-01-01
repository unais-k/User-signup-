const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/connection");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const session = require("express-session");
const nocache = require("nocache");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

db.connect((err) => {
    if (err) console.log("Database not connected  " + err);
    else console.log("Database connected succesfully");
});
app.use(
    session({
        secret: "sessionkey",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 6000000 },
    })
);
app.use(nocache());

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.listen(3005, () => {
    console.log("server runs on PORT 3005");
});
