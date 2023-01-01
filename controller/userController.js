const bcrypt = require("bcrypt");
const collectionName = require("../config/collection");
const db = require("../config/connection");

let products = [];
products.push({ name: "xl6", category: "Car", description: "Family car", image: "images/xl6.jpg" });
products.push({ name: "Swift", category: "Car", description: "Family car", image: "images/swift.jpg" });
products.push({ name: "Baleno", category: "Car", description: "Family car", image: "images/baleno.jpg" });
products.push({ name: "Ciaz", category: "Car", description: "Family car", image: "images/ciaz.jpg" });
let products1 = [];
products1.push({ name: "Accord", category: "Car", description: "Family car", image: "images/accord.jpg" });
products1.push({ name: "City", category: "Car", description: "Family car", image: "images/city.jpg" });
products1.push({ name: "Civic", category: "Car", description: "Family car", image: "images/civic.jpg" });
products1.push({ name: "Jazz", category: "Car", description: "Family car", image: "images/jazz.jpg" });

const userLogin = (req, res) => {
    console.log("user login enterd");
    if (req.session.loginUser) {
        console.log("User enter with session 1");
        res.render("userHome", { products, products1 });
    } else {
        console.log("open site 3005");
        res.render("userLogin", { message: false });
    }
};
const home = async (req, res) => {
    console.log(req.body);
    console.log("User login");
    const { email, password } = req.body;
    let data = await db.get().collection(collectionName.userId).findOne({ email: email });
    console.log("data showed");
    console.log(data);
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result) {
                req.session.loginUser = true;
                console.log("login to userHome");
                res.render("userHome", { products, products1 });
            } else {
                req.session.loginUserError = true;
                console.log("password Error");
                res.render("userLogin", { message: "password invalid" });
            }
        });
    } else {
        req.session.loginUserError = true;
        console.log("user Error");
        res.render("userLogin", { message: "user invalid" });
    }
};
const signUpPost = async (req, res) => {
    console.log("user submitting data to db");
    let name = req.body.name;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    let data = {
        name: name,
        email: email,
        password: password,
    };
    db.get()
        .collection(collectionName.userId)
        .insertOne(data, (err, result) => {
            if (err) throw err;
            console.log(err);
        });
    console.log("userdata saved success");
    res.redirect("/");
};
const signUp = (req, res) => {
    console.log("Creating new User");
    res.render("signUp");
};
const userLogout = (req, res) => {
    console.log("user logout");
    req.session.destroy();
    res.redirect("/");
};
module.exports = { home, userLogin, userLogout, signUp, signUpPost };
