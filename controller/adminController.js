const db = require("../config/connection");
const collectionName = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

let products = [];
products.push({ id: 1, name: "xl6", category: "Car", description: "Family car", image: "xl6.jpg" });
products.push({ id: 2, name: "Swift", category: "Car", description: "Family car", image: "swift.jpg" });
products.push({ id: 3, name: "Baleno", category: "Car", description: "Family car", image: "baleno.jpg" });
products.push({ id: 4, name: "Ciaz", category: "Car", description: "Family car", image: "ciaz.jpg" });
let products1 = [];
products1.push({ id: 5, name: "Accord", category: "Car", description: "Family car", image: "accord.jpg" });
products1.push({ id: 6, name: "City", category: "Car", description: "Family car", image: "city.jpg" });
products1.push({ id: 7, name: "Civic", category: "Car", description: "Family car", image: "civic.jpg" });
products1.push({ id: 8, name: "Jazz", category: "Car", description: "Family car", image: "jazz.jpg" });

const adminLogin = (req, res) => {
    if (req.session.adminLogin) {
        console.log(" admin enter with session");
        req.session.adminLoginError = false;
        res.render("adminHome", { products, products1 });
    } else {
        req.session.adminLoginError = true;
        console.log("admin enter site 3005/admin");
        res.render("adminLogin", { message: false });
    }
};
const adminEmail = "admin@gmail.com";
const adminPassword = 123456;
const adminHome = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email == adminEmail && password == adminPassword) {
        req.session.adminLogin = true;
        req.session.adminLoginError = false;
        console.log("admin Login");
        res.render("adminHome", { products, products1 });
    } else {
        req.session.adminLoginError = true;
        console.log("admin loggin error");
        res.render("adminLogin", { message: "user invalid" });
    }
};
const userList = async (req, res) => {
    let userListCollection = await db.get().collection(collectionName.userId).find().toArray();
    console.log(userListCollection);
    if (req.session.adminLogin) {
        console.log("admin userlist enterd");
        res.render("userList", { userListCollection });
    } else {
        res.redirect("/admin");
    }
    // res.render("userList", { userListCollection });
};
const addUser = (req, res) => {
    if (req.session.adminLogin) {
        console.log("admin adduser enterd");
        res.render("addUser");
    } else {
        res.redirect("/admin");
    }
    // res.render("addUser");
};
const addUserPost = async (req, res) => {
    console.log("adduser enter");
    let name = req.body.name;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    let data = {
        name: name,
        email: email,
        password: password,
    };
    console.log("data printing" + data);

    db.get()
        .collection(collectionName.userId)
        .insertOne(data, (err, result) => {
            if (err) throw err;
            console.log(err);
            // console.log("adduser insert");
        });
    console.log("adduser insert");
    if (req.session.adminLogin) {
        console.log("user created");
        res.redirect("/admin/addUser");
    } else {
        res.redirect("/admin");
    }
};
const backToAdmin = async (req, res) => {
    let userListCollection = await db.get().collection(collectionName.userId).find().toArray();
    if (req.session.adminLogin) {
        res.render("userList", { userListCollection });
    } else {
        res.render("adminLogin", { message: false });
        req.session.destroy();
    }
};
const logout = (req, res) => {
    res.render("adminLogin", { message: false });
    req.session.destroy();
};
const deleteUser = async (req, res) => {
    let deleteId = req.params.id;
    console.log(deleteId);
    await db
        .get()
        .collection(collectionName.userId)
        .deleteOne({ _id: ObjectId(deleteId) });
    console.log("user deleted");
    res.redirect("/admin/userList");
};
const editUser = async (req, res) => {
    let editId = req.params.id;
    let userListCollection = await db
        .get()
        .collection(collectionName.userId)
        .findOne({ _id: ObjectId(editId) });
    if (req.session.adminLogin) {
        res.render("editUser", { editId, userListCollection });
    } else {
        res.redirect("/admin");
    }
};
const editUserSubmit = async (req, res) => {
    let editId = req.params.id;
    const editEmail = req.body.email;
    const editName = req.body.name;
    await db
        .get()
        .collection(collectionName.userId)
        .updateOne({ _id: ObjectId(editId) }, { $set: { name: editName, email: editEmail } });
    res.redirect("/admin/userList");
};
const searchUser = async (req, res) => {
    const regEx = new RegExp(req.body.searchData, "i");
    let matchedData = await db
        .get()
        .collection(collectionName.userId)
        .find({
            $or: [
                {
                    name: { $regex: regEx },
                },
                {
                    email: { $regex: regEx },
                },
            ],
        })
        .toArray();
    console.log(matchedData);
    if (req.session.adminLogin) {
        res.render("searchList", { matchedData });
    } else {
        res.redirect("/admin");
    }
};

module.exports = {
    adminLogin,
    adminHome,
    userList,
    addUser,
    addUserPost,
    backToAdmin,
    logout,
    deleteUser,
    editUser,
    editUserSubmit,
    searchUser,
};
