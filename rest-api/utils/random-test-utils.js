
const Question = require('../models/question-schema');
const { saveTestByQuestions } = require("../services/test-service");

const generatorTeste = async () => {
    try {
        const result = await Question.aggregate([
            { $sample: { size: 26 } },
            { $project: { _id: 1 } }
        ]);

        const randomQuestionIds = result.map(question => question._id.toString());
        console.log('Random Question IDs:', randomQuestionIds);
        return randomQuestionIds;
    } catch (error) {
        console.error('Error retrieving random question IDs:', error);
        throw error;
    }
}
const addRandomTest = async () => {
    const q = await generatorTeste();
    await saveTestByQuestions(q);
}

const generateNrTests = async (n) => {
    for (let i = 1; i <= n; ++i) {
        await addRandomTest();
    }
}

module.exports = { generateNrTests , generatorTeste };