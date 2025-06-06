const express = require("express");
const authController = require("../controllers/authentication");
const kidController = require("../controllers/kidcontroller");
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

router
  .route("/loginAsAdmin")
  .get((req, res) => {
    console.log("test");

    res.sendFile(path.join(__dirname, "../../frontend/src/Pages/Login.tsx"));
  })
  .post(authController.logInAsAdmin);

//signUp routes

router
  .route("/signup")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/src/Pages/SignUp.tsx"));
  })
  .post(authController.signUp);

router.route("/verify").post(authController.verificationCode);
router.route("/verify/:id").post(authController.validateVerificationCode);


router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/settings").patch(authController.updatePassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.get("/protected", authController.protectroute, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}` });
});

router.route("/getUserData").get(authController.getUserData);

router.route("/updateUserData").patch(authController.updateUserData);
router.route("/updateKidData/:id").patch(kidController.updatekidinfo);

router.get("/logout", authController.logout);



module.exports = router;
