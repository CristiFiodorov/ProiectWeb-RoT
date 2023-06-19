const Chapter = require('../models/chapter-scheme');
const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { createEmptyChapterContent, deleteChapterContentByChapterId } = require('./chapter-content-service');

async function findChaptersByCourseId(courseId) {
    try {
        const chapters = await Chapter.find({ parentId: courseId });

        if (chapters.length === 0)
            return new Status(404, new Response(false, null, "Chapters not found."));

        return new Status(200, new Response(true, chapters, "Chapters successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findChapterById(chapterId) {
    const chapter = await Chapter.findById(chapterId);
    if(!chapter) {
        return new Status(404, new Response(false, null, "Chapter not found."));
    }
    return new Status(200, new Response(true, chapter, "Chapter successfully retrieved."));
}

async function createChapter(chapter) {
    try {
        const newChapter = new Chapter(chapter);
        const savedChapter = await newChapter.save();

        const { statusCode, response } = await createEmptyChapterContent(savedChapter._id);

        if (statusCode !== 201)
            return new Status(statusCode, response);

        return new Status(201, new Response(true, savedChapter, "Chapter successfully created."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function updateChapterById(chapter_id, chapter) {
    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(chapter_id, chapter, { new: true });

        if (!updatedChapter)
            return new Status(404, new Response(false, null, "Chapter not found."));

        return new Status(200, new Response(true, updatedChapter, "Chapter successfully updated."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteChapterById(id) {
    try {
        const chapter = await Chapter.findByIdAndDelete(id);

        if (!chapter)
            return new Status(404, new Response(false, null, "Chapter not found."));

        const { statusCode, response } = await deleteChapterContentByChapterId(id);

        if (statusCode !== 200)
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
        const chapters = await Chapter.deleteMany({ parentId: courseId });

        if (!chapters)
            return new Status(404, new Response(false, null, "Chapters not found."));

        for (let i = 0; i < chapters.length; i++) {
            const { statusCode, response } = await deleteChapterContentByChapterId(chapters[i]._id);

            if (statusCode !== 200)
                return new Status(statusCode, response);
        }

        return new Status(200, new Response(true, chapters, "Chapters successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findPrevChapterByCourseId(chapterId, courseId) {
    try {
        const chapters = await Chapter.find({ parentId: courseId });
        const currentChapterIndex = chapters.findIndex(chapter => chapter._id.toString() === chapterId);
        
        if (currentChapterIndex === 0) {
            return new Status(200, new Response(true, chapters[chapters.length - 1], "Sign successfully retrieved."));
        }

        const prevChapter = chapters[currentChapterIndex - 1];
        return new Status(200, new Response(true, prevChapter, "Sign successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findNextChapterByCourseId(chapterId, courseId) {
    try {
        const chapters = await Chapter.find({ parentId: courseId });
        const currentChapterIndex = chapters.findIndex(chapter => chapter._id.toString() === chapterId);
        
        if (currentChapterIndex === chapters.length - 1) {
            return new Status(200, new Response(true, chapters[0], "Sign successfully retrieved."));
        }

        const nextChapter = chapters[currentChapterIndex + 1];
        return new Status(200, new Response(true, nextChapter, "Sign successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = {
    findChaptersByCourseId,
    createChapter,
    updateChapterById,
    deleteChapterById,
    deleteChaptersByCourseId,
    findChapterById,
    findPrevChapterByCourseId,
    findNextChapterByCourseId
};