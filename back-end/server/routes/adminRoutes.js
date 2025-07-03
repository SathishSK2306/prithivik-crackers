const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../utils/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router
  .route("/profile")
  .get(protect, authController.getUserProfile)
  .put(protect, authController.updateUserProfile);

module.exports = router;
