const express = require("express");
const authController = require("../controllers/authentication");
const path = require("path");

const router = express.Router();

//login routes
router
  .route("/login")
  .get((req, res) => {
    console.log("test");

    res.sendFile(path.join(__dirname, "../../frontend/src/Pages/Login.tsx"));
  })
  .post(authController.logIn);

//signUp routes

router
  .route("/signup")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/src/Pages/SignUp.tsx"));
  })
  .post(authController.signUp);

router.route("/verify").post(authController.verificationCode);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/settings").post(authController.updatePassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router.post("/updatePassword", authController.updatePassword);

router.get("/protected", authController.protectroute, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}` });
});

router.route("/getUserData").get(authController.getUserData);

router.route("/updateUserData").patch(authController.updateUserData);

router.get("/logout", authController.logout);



module.exports = router;
