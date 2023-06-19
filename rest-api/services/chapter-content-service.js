const ChapterContent = require('../models/chapter-content-scheme');
const Chapter = require('../models/chapter-scheme');

const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");

async function findChapterContentByChapterId(chapterId) {
    try {
        const chapterContent = await ChapterContent.find({ parentId: chapterId });

        if (chapterContent.length === 0)
            return new Status(404, new Response(false, null, "Chapter content not found."));

        return new Status(200, new Response(true, chapterContent[0], "Chapter content successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function createEmptyChapterContent(chapterId) {
    try {
        const newChapterContent = new ChapterContent({ parentId: chapterId });
        const savedChapterContent = await newChapterContent.save();

        return new Status(201, new Response(true, savedChapterContent, "Chapter content successfully created."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function addToChapterContent(chapterId, content) {
    try {
        const chapterContent = await ChapterContent.find({ parentId: chapterId });

        if (chapterContent.length === 0)
            return new Status(404, new Response(false, null, "Chapter content not found."));

        chapterContent[0].content.push(content);
        const savedChapterContent = await chapterContent[0].save();

        return new Status(200, new Response(true, savedChapterContent, "Chapter content successfully updated."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteChapterContentById(id) {
    try {
        const chapterContent = await ChapterContent.findByIdAndDelete(id);

        if (!chapterContent)
            return new Status(404, new Response(false, null, "Chapter content not found."));

        return new Status(200, new Response(true, chapterContent, "Chapter content successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}


async function deleteChapterContentByChapterId(chapterId) {
    try {
        const chapterContent = await ChapterContent.deleteMany({ parentId: chapterId });

        if (!chapterContent)
            return new Status(404, new Response(false, null, "Chapter content not found."));

        return new Status(200, new Response(true, chapterContent, "Chapter content successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = {
    findChapterContentByChapterId,
    createEmptyChapterContent,
    addToChapterContent,
    deleteChapterContentById,
    deleteChapterContentByChapterId
};