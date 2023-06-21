const Sign = require('../models/sign-scheme');
const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");

async function findSignsByCategory(categoryId) {
    try {
        const signs = await Sign.find({ parentId: categoryId });

        if (signs.length === 0)
            return new Status(404, new Response(false, null, "Signs not found."));

        return new Status(200, new Response(true, signs, "Signs successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findSignById(signId) {
    try {
        const sign = await Sign.find({ _id: signId });
        if (sign.length === 0)
            return new Status(404, new Response(false, null, "Sign not found."));

        return new Status(200, new Response(true, sign[0], "Sign successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findNextSignsByCategory(signId, categoryId) {
    try {
        const signs = await Sign.find({ parentId: categoryId });
        const currentSignIndex = signs.findIndex(sign => sign._id.toString() === signId);

        if(currentSignIndex === -1)
            return new Status(404, new Response(false, null, "Sign not found."));

        if (currentSignIndex === signs.length - 1)
            return new Status(200, new Response(true, signs[0], "Sign successfully retrieved."));

        const nextSign = signs[currentSignIndex + 1];
        return new Status(200, new Response(true, nextSign, "Sign successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}


async function findPrevSignsByCategory(signId, categoryId) {
    try{
        const signs = await Sign.find({ parentId: categoryId });
        const currentSignIndex = signs.findIndex(sign => sign._id.toString() === signId);

        if(currentSignIndex === -1)
            return new Status(404, new Response(false, null, "Sign not found."));

        if (currentSignIndex === 0)
            return new Status(200, new Response(true, signs[signs.length - 1], "Sign successfully retrieved."));

        const prevSign = signs[currentSignIndex - 1];

        return new Status(200, new Response(true, prevSign, "Sign successfully retrieved."));
    }
    catch(error){
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}


async function createSign(sign) {
    try {
        const newSign = new Sign(sign);
        const savedSign = await newSign.save();
        return new Status(201, new Response(true, savedSign, "Sign successfully created."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteSignById(signId) {
    try {
        const deletedSign = await Sign.findByIdAndDelete(signId);
        if (!deletedSign)
            return new Status(404, new Response(false, null, "Sign not found."));

        return new Status(200, new Response(true, deletedSign, "Sign successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function updateSignById(signId, sign) {
    try {
        const updatedSign = await Sign.findByIdAndUpdate(signId, sign);

        if (!updatedSign)
            return new Status(404, new Response(false, null, "Sign not found."));

        return new Status(200, new Response(true, updatedSign, "Sign successfully updated."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}


async function deleteSignsByCategoryId(categoryId) {
    try {
        const deletedSigns = await Sign.deleteMany({ parentId: categoryId });
        if (!deletedSigns)
            return new Status(404, new Response(false, null, "Signs not found."));

        return new Status(200, new Response(true, deletedSigns, "Signs successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findAllSigns() {
    try {
        const signs = await Sign.find({}, {__v: 0});
        return new Status(200, new Response(true, signs, "Signs successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findAllSignsInCSV() {
    try {
        const signs = await Sign.find({}, {__v: 0});

        if (signs.length === 0)
            return new Status(404, new Response(false, null, "Signs not found."));

        const csv = signs.map(sign => {
            return `${sign._id},"${sign.title}","${sign.description.trim().replace('\r\n', '').replace('\n', '')}",${sign.parentId} `;
        }).join('\r\n');


        return new Status(200, new Response(true, csv, "Signs successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = {
    findSignsByCategory,
    findSignById,
    findNextSignsByCategory,
    findPrevSignsByCategory,
    createSign,
    deleteSignById,
    updateSignById,
    deleteSignsByCategoryId,
    findAllSigns,
    findAllSignsInCSV
};