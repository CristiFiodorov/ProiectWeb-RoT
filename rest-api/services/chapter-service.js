const Chapter = require('../models/chapter-scheme');
const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { deleteChapterContentByChapterId } = require('./chapter-content-service');

async function findChaptersByCourseId(courseId) {
    try {
        const chapters = await Chapter.find({parentId: courseId});

        if(chapters.length === 0)
            return new Status(404, new Response(false, null, "Chapters not found."));

        return new Status(200, new Response(true, chapters, "Chapters successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteChapterById(id) {
    try {
        const chapter = await Chapter.findByIdAndDelete(id);

        if(!chapter)
            return new Status(404, new Response(false, null, "Chapter not found."));

        const {statusCode, response} = await deleteChapterContentByChapterId(id);

        if(statusCode !== 200)
            return new Status(statusCode, response);

        return new Status(200, new Response(true, chapter, "Chapter successfully deleted."));

    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteChaptersByCourseId(courseId) {
    try {
        const chapters = await Chapter.deleteMany({parentId: courseId});

        if(!chapters)
            return new Status(404, new Response(false, null, "Chapters not found."));

        for(let i = 0; i < chapters.length; i++) {
            const {statusCode, response} = await deleteChapterContentByChapterId(chapters[i]._id);

            if(statusCode !== 200)
                return new Status(statusCode, response);
        }

        return new Status(200, new Response(true, chapters, "Chapters successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = {
    findChaptersByCourseId,
    deleteChapterById,
    deleteChaptersByCourseId
};