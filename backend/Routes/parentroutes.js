const express = require("express");
const authController = require("../controllers/authentication");
const kidControllers = require("../controllers/kidcontroller");
const parentControllers = require("../controllers/parentControllers");
// const path = require('path');
//start the route
const router = express.Router();

router
  .route("/profile")
  .get(parentControllers.getParentInfo)
  .post(parentControllers.getParentInfo)

router
  .route("/")
  .get()
  .post()
  .patch(parentControllers.updateParent)  
  // .delete(parentControllers.removeParent);

router
  .route("/:id")
  .get(parentControllers.getParentId)
  .post()


router  
  .route("/kids")
  .get(kidControllers.getAllKids)
  .post(kidControllers.addKid)
  .patch(kidControllers.updatekidinfo)
  .delete(kidControllers.removeKid);
  
router.route("/parent/settings").get().post().patch().delete();

module.exports = router;
