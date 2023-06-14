const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const Question = require("../models/question-schema");
const { mongo } = require("mongoose");
const { getBodyFromRequest } = require("../utils/request-utils");

// CREATE
const saveQuestion = async(req) =>{
  try{
    const { question, image_url, answers } = JSON.parse( await getBodyFromRequest(req));

    const newQuestion = new Question({
      question,
      image_url,
      answers,
    });
    newQuestion.save();
    return new Status(201, new Response(true, newQuestion, "Questions successfully created."));
  } catch(error){
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}
// READ
const _getQuestions = async () => {
  try {
    const questions = await Question.find();
    return questions;
  } catch (error) {
    console.error(error);
  }
};

const getQuestions = async () => {
  try {
    const questions = await _getQuestions();
    console.log(questions);
    return new Status(200, new Response(true, questions, "Questions successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}


const _getQuestionById = async (id) => {
  try {
    console.log(id);
    const question = await Question.findById(id);
    return question;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getQuestionById = async (params) => {
  try {
    const id = params.id;
    console.log(id);
    const question = await _getQuestionById(id);
    console.log(question);
    return new Status(200, new Response(true, question, "Question successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}


// UPDATE

// DELETE
module.exports = { saveQuestion, getQuestions, getQuestionById };