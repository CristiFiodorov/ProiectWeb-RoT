const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { mongo } = require("mongoose");
const { getBodyFromRequest, isNotStringOf24Characters } = require("../utils/request-utils");
const { generatorTeste } = require("../utils/random-test-utils");
const Test = require("../models/test-schema");


const saveTestByQuestions = async (questions) => {
  //TODO AUTO INCREMENT TESTID
  try {
    const result = await Test.findOne({}, 'testId')
      .sort({ testId: -1 })
      .exec();

    if (!result) {
      return new Status(500, new Response(false, null, "There was an internal error."));
    }
    const testId = result.testId + 1;
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
// CREATE
const saveTest = async (req) => {
  //TODO AUTO INCREMENT TESTID
  try {
    const { questions } = JSON.parse(await getBodyFromRequest(req));
    const result = await Test.findOne({}, 'testId')
      .sort({ testId: -1 })
      .exec();

    if (!result) {
      return new Status(500, new Response(false, null, "There was an internal error."));
    }
    const testId = result.testId + 1;
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
    if (isNotStringOf24Characters(id)) { return null; }
    const test = await Test.findById(id);
    return test;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

const _getTestByIndex = async (index) => {
  try {
    console.log(index);
    if (index === 'random') {
      return { questions: (await generatorTeste()) };
    }
    const test = await Test.findOne({ testId: index });
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
    if (test == null) {
      return new Status(404, new Response(false, null, "Resource was not found."));
    }
    return new Status(200, new Response(true, test, "Test successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}


const getTestByIndex = async (params) => {
  try {
    const id = params.id;
    console.log(id);
    const test = await _getTestByIndex(id);
    console.log(test);
    return new Status(200, new Response(true, test, "Test successfully retrieved."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}

// UPDATE

const _updateTest = async (req, testId) => {
  try {
    const body = JSON.parse(await getBodyFromRequest(req));
    const fields = ['questions'];
    fields.map(field => {
      if (body.hasOwnProperty(field)) {
        updatedData[field] = body[field];
      }
    });

    if ((await Test.findOne({ testId: index })) == null) {
      return null;
    }
    await Test.updateOne({ _id: `${testId}` }, { $set: updatedData });
    const test = await _getTestById(testId);
    return test;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

const updateTest = async (req, params) => {
  try {
    const test = await _updateTest(req, params.id);
    if (test == null) { return new Status(404, new Response(false, null, "Resource was not found.")); }
    return new Status(200, new Response(true, test, "Test successfully updated."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}

// // DELETE
const _deleteTest = async (params) => {
  try {
    const test = await _getTestById(params.id);
    if (test == null) { return new Status(404, new Response(false, null, "Resource was not found.")); }
    console.log(test);
    console.log(test._id);
    await Test.deleteOne({ _id: test._id });
    return new Status(204, new Response(true, null, "Test successfully deleted."));
  } catch (error) {
    console.error(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
  }
}
module.exports = { saveTest, getTests, getTestById, getTestByIndex, saveTestByQuestions, updateTest, _deleteTest };