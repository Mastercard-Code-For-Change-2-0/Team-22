const express = require("express");
const { checkRequirements, placeDonation } = require("../controllers/donationController");
const { upload } = require("../middleware/uploads");


const router = express.Router();


router.route("/").get(checkRequirements);
router.route("/with-images").post(upload.array("images"), placeDonation);


module.exports = router;
