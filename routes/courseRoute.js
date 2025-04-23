const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById } = require('../controllers/courseController');
const Course = require("../models/course");
const { Authenticate } = require("../middleware/authMiddleware");

router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);

module.exports = router;