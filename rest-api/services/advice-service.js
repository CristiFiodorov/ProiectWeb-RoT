const Advice = require('../models/advice-scheme');
const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");

async function findAllAdvices() {
    try {
        const advices = await Advice.find();

        if(advices.length === 0)
            return new Status(404, new Response(false, null, "Advices not found."));

        return new Status(200, new Response(true, advices, "Advices successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function findAdviceById(adviceId) {
    try {
        const advice = await Advice.find({_id: adviceId});
        if(advice.length === 0)
            return new Status(404, new Response(false, null, "Advice not found."));

        return new Status(200, new Response(true, advice[0], "Advice successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function createAdvice(advice) {
    try {
        const newAdvice = new Advice(advice);
        const savedAdvice = await newAdvice.save();

        return new Status(200, new Response(true, savedAdvice, "Advice successfully created."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function updateAdviceById(adviceId, advice) {
    try {
        const updateAdvice = await Advice.findByIdAndUpdate(adviceId, advice);

        if(!updateAdvice)
            return new Status(404, new Response(false, null, "Advice not found."));

        return new Status(200, new Response(true, updateAdvice, "Advice successfully updated."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteAdviceById(adviceId) {
    try {
        const deletedAdvice = await Advice.findByIdAndDelete(adviceId);

        if(!deletedAdvice)
            return new Status(404, new Response(false, null, "Advice not found."));

        return new Status(200, new Response(true, deletedAdvice, "Advice successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}


async function findNextAdvice(adviceId) {
    const advices = await Advice.find();
    const currentAdviceIndex = advices.findIndex(advice => advice._id.toString() === adviceId);

    if (currentAdviceIndex === advices.length - 1)
        return new Status(200, new Response(true, advices[0], "Advice successfully retrieved."));

    const nextAdvice = advices[currentAdviceIndex + 1];
    return new Status(200, new Response(true, nextAdvice, "Advice successfully retrieved."));
}

async function findPrevAdvice(adviceId) {
    const advices = await Advice.find();
    const currentAdviceIndex = advices.findIndex(advice => advice._id.toString() === adviceId);

    if (currentAdviceIndex === 0)
        return new Status(200, new Response(true, advices[advices.length - 1], "Advice successfully retrieved."));

    const previousAdvice = advices[currentAdviceIndex - 1];
    return new Status(200, new Response(true, previousAdvice, "Advice successfully retrieved."));
}

module.exports = {
    findAllAdvices,
    findAdviceById,
    createAdvice,
    updateAdviceById,
    deleteAdviceById,
    findNextAdvice,
    findPrevAdvice
};