var express = require("express");
var router = express.Router();

const { home, userLogin, userLogout, signUp, signUpPost } = require("../controller/userController");
/* GET home page. */
router.get("/", userLogin);
router.get("/userLogout", userLogout);
router.get("/signUp", signUp);

router.post("/home", home);
router.post("/signUpPost", signUpPost);

module.exports = router;
