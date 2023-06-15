const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { mongo } = require("mongoose");
const { getBodyFromRequest } = require("../utils/request-utils");
const Test = require("../models/test-schema");

// CREATE
const saveTest = async (req) => {
  try {
    const { testId, questions } = JSON.parse(await getBodyFromRequest(req));

    const newTest = new Test({
      testId,
      questions
    });
    newTest.save();
    return new Status(201, new Response(true, newTest, "Test successfully created."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}
// READ
const _getTests = async () => {
  try {
    const tests = await Test.find();
    return tests;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

const getTests = async () => {
  try {
    const tests = await _getTests();
    console.log(tests);
    return new Status(200, new Response(true, tests, "Tests successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}


const _getTestById = async (id) => {
  try {
    console.log(id);
    const test = await Test.findById(id);
    return test;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

const getTestById = async (params) => {
  try {
    const id = params.id;
    console.log(id);
    const test = await _getTestById(id);
    console.log(test);
    return new Status(200, new Response(true, test, "Question successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}


// UPDATE

// const _updateQuestion = async (req, questionId) => {
//   try {
//     const body = JSON.parse( await getBodyFromRequest(req));
//     let updatedData = {};
//     const fields = ['question', 'image_url', 'answers'];
//     fields.map(field =>{
//       if(body.hasOwnProperty(field)){
//         updatedData[field] = body[field];
//       }
//     });

//      await Question.updateOne({ _id: `${questionId}`}, { $set : updatedData});
//      const question  = await _getQuestionById(questionId);
//     return question;
//   } catch (error) {
//     console.error(error);
//     throw new Error();
//   }
// };

// const updateQuestion = async (req, params) =>{
//   try{
//       const question = await _updateQuestion(req, params.id);
//       return new Status(200, new Response(true, question, "Question successfully updated."));
//   } catch (error) {
//     console.error(error);
//     return new Status(500, new Response(false, null, "There was an internal error."));
//   }
// }

// // DELETE
// const _deleteQuestion = async(params) =>{
//   try{
//     const question = await _getQuestionById(params.id);
//     Question.findOneAndRemove({_id : params.id});
//     return new Status(204, new Response(true, null, "Question successfully deleted."));
//   } catch (error) {
//     console.error(error);
//     return new Status(500, new Response(false, null, "There was an internal error."));
//   }
// }
// module.exports = { saveQuestion, getQuestions, getQuestionById, _deleteQuestion, updateQuestion };
module.exports = { saveTest, getTests, getTestById };