const Course = require('../models/course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    const { title, description, price, duration } = req.body;

    if (!title || !description || !price || !duration) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const newCourse = new Course({ title, description, price, duration });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    const { title, description, price, duration } = req.body;

    if (!title || !description || !price || !duration) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { title, description, price, duration }, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};