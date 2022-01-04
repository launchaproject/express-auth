// external imports
const express = require("express");

// internal imports
const { login, regiser, allUser } = require("../controller/userController");
const { isAdmin } = require("../middleware/authGurd/authGurd");
const {
  registerValidators,
  registerValidatorsHandler,
  doLoginValidators,
  doLoginValidationHandlers,
} = require("../middleware/validators/userValidators");

// define router interface
const router = express.Router();

// user login
router.post("/login", doLoginValidators, doLoginValidationHandlers, login);

// user register
router.post(
  "/register",
  registerValidators,
  registerValidatorsHandler,
  regiser
);

// user register
router.get("/all", isAdmin, allUser);

module.exports = router;
