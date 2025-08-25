const express = require("express");
const { registerDonor, loginDonor } = require("../controllers/donorController");

const router = express.Router();

router.post("/register", registerDonor);
router.post("/login", loginDonor);

module.exports = router;
