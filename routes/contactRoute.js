const express = require("express");
const router = express.Router();
const { Authenticate } = require("../middleware/authMiddleware");
const ContactUs = require("../models/contact");
const { submitContact } = require("../controllers/contactController");

router.post("/contactUs", submitContact);

module.exports = router;