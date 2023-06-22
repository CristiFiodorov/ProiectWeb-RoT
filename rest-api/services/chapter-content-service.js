const ChapterContent = require('../models/chapter-content-scheme');
const Chapter = require('../models/chapter-scheme');

const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");

async function findChapterContentByChapterId(chapterId) {
    try {
        const chapterContent = await ChapterContent.find({ parentId: chapterId }, { __v: 0});

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

async function clearChapterContent(chapterId) {
    try {
        const chapterContent = await ChapterContent.find({ parentId: chapterId });

        if (chapterContent.length === 0)
            return new Status(404, new Response(false, null, "Chapter content not found."));

        chapterContent[0].content = [];

        const savedChapterContent = await chapterContent[0].save();

        return new Status(200, new Response(true, savedChapterContent, "Chapter content successfully cleared."));
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

async function findChapterContentByChapterIdInCSV(chapterId) {
    try {
        const chapterContent = await ChapterContent.find({ parentId: chapterId });

        if (chapterContent.length === 0)
            return new Status(404, new Response(false, null, "Chapter content not found."));

        const csv = chapterContent[0].content.map((content) => {
            return `${content.elementType},"${content.data}" `
        }).join('\r\n');

        return new Status(200, new Response(true, csv, "Chapter content successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function updateChapterContent(chapterId, content) {
    try {
        const chapterContent = await ChapterContent.find({ parentId: chapterId });

        if (chapterContent.length === 0)
            return new Status(404, new Response(false, null, "Capitol indisponibil."));

        let areValidFields = true;
        content.forEach((element) => {
            if(!element.elementType || !element.data) {
                areValidFields = false;
            }
        });

        if(!areValidFields) {
            return new Status(400, new Response(false, null, "Câmpuri invalide în fișierul JSON. Respectați formatul impus."));
        }

        chapterContent[0].content = content;
        const savedChapterContent = await chapterContent[0].save();
        return new Status(200, new Response(true, savedChapterContent, "Chapter content successfully updated."));
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
    clearChapterContent,
    deleteChapterContentById,
    deleteChapterContentByChapterId,
    findChapterContentByChapterIdInCSV,
    updateChapterContent
};