var express = require("express");
var router = express.Router();

const {
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
} = require("../controller/adminController");
/* GET home page. */
router.get("/", adminLogin);
router.post("/adminHome", adminHome);
router.get("/userList", userList);
router.get("/addUser", addUser);
router.post("/addUserPost", addUserPost);
router.get("/backToAdmin", backToAdmin);
router.get("/logout", logout);
router.get("/deleteUser/:id", deleteUser);
router.get("/editUser/:id", editUser);
router.post("/editUserSubmit/:id", editUserSubmit);
router.post("/searchUser", searchUser);
module.exports = router;
