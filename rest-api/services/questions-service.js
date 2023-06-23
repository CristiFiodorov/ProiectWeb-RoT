const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const Question = require("../models/question-schema");
const { mongo } = require("mongoose");
const { getBodyFromRequest, isNotStringOf24Characters } = require("../utils/request-utils");

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
    throw new Error();
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
    if (isNotStringOf24Characters(id)) { return null; }
    const question = await Question.findById(id);
    return question;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

const getQuestionById = async (params) => {
  try {
    const id = params.id;
    console.log(id);
    const question = await _getQuestionById(id);
    if (question == null) { return new Status(404, new Response(false, null, "Resource was not found.")); }
    console.log(question);
    return new Status(200, new Response(true, question, "Question successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}


// UPDATE

const _updateQuestion = async (req, questionId) => {
  try {
    const body = JSON.parse( await getBodyFromRequest(req));
    let updatedData = {};
    const fields = ['question', 'image_url', 'answers'];
    fields.map(field =>{
      if(body.hasOwnProperty(field)){
        updatedData[field] = body[field];
      }
    });
    
    if ((await _getQuestionById(questionId)) == null) return null;
     await Question.updateOne({ _id: `${questionId}`}, { $set : updatedData});
     const question  = await _getQuestionById(questionId);
    return question;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

const updateQuestion = async (req, params) =>{
  try{
      const question = await _updateQuestion(req, params.id);
      if(question == null) { return new Status(404, new Response(false, null, "Resource was not found.")); }
      return new Status(200, new Response(true, question, "Question successfully updated."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}

// DELETE
const _deleteQuestion = async(params) =>{
  try{
    const question = await _getQuestionById(params.id);
    if(question == null) { return new Status(404, new Response(false, null, "Resource was not found.")); }
    await Question.deleteOne({_id : params.id});
    return new Status(204, new Response(true, null, "Question successfully deleted."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}
module.exports = { saveQuestion, getQuestions, getQuestionById, _deleteQuestion, updateQuestion };