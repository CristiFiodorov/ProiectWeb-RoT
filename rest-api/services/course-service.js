const Course = require('../models/course-scheme');
const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { deleteChaptersByCourseId } = require('./chapter-service');

async function findAllCourses() {
    try {
        const courses = await Course.find();

        if(courses.length === 0)
            return new Status(404, new Response(false, null, "Courses not found."));

        return new Status(200, new Response(true, courses, "Courses successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function createCourse(course) {
    try {
        const newCourse = new Course(course);
        const savedCourse = await newCourse.save();

        if(!savedCourse)
            return new Status(400, new Response(false, null, "Course could not be created."));

        return new Status(201, new Response(true, savedCourse, "Course successfully created."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteCourseById(id) {
    try {
        const course = await Course.findByIdAndDelete(id);

        if(!course)
            return new Status(404, new Response(false, null, "Course not found."));

        const {statusCode, response} = await deleteChaptersByCourseId(id);

        if(statusCode !== 200)
            return new Status(statusCode, response);

        return new Status(200, new Response(true, course, "Course successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function updateCourseById(id, course) {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, course, {new: true});

        if(!updatedCourse)
            return new Status(404, new Response(false, null, "Course not found."));

        return new Status(200, new Response(true, updatedCourse, "Course successfully updated."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = {
    findAllCourses,
    createCourse,
    deleteCourseById,
    updateCourseById
};