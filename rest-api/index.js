require('dotenv').config();

const mongoose = require('mongoose');

const { ServerManager } = require('./config/server-manager');
const {  findAllQuestions, findQuestionById, createQuestion, deleteQuestion, patchQuestion } = require('./controllers/questions-controller');
const { createTest, findAllTests, findTestById, findTestByIndex } = require('./controllers/test-controller');

const { loginUser } = require('./controllers/login-controller');
const { registerUser } = require('./controllers/register-controller');
const { verifyToken } = require('./services/auth-service');
const Question = require('./models/question-schema');
const server = new ServerManager();

mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

//TODO case when entity not found
server.post('/tests', async (req, res, params) => { createTest(req, res, params); });
server.get('/tests', async (req, res, params) => { findAllTests(req, res, params); });
server.get('/tests/:id', async (req, res, params) => { findTestById(req, res, params); });
server.get('/tests/index/:id', async (req, res, params) => { findTestByIndex(req, res, params); });

server.post('/questions', async (req, res, params) => { createQuestion(req, res, params); });
server.patch('/questions/:id', async (req, res, params) => { patchQuestion(req, res, params); });
server.get('/questions', async (req, res, params) => { findAllQuestions(req, res, params); });
server.get('/questions/:id', async (req, res, params) => { findQuestionById(req, res, params); });
server.delete('/questions/:id', async (req, res, params) => { deleteQuestion(req, res, params); });


server.post('/api/v1/register', async (req, res) => {
    registerUser(req, res);
});

server.post('/api/v1/login', async (req, res) => {
    loginUser(req, res);
});

server.get('/api/v1/test', async (req, res) => {
    // verifyToken(req, res, async () => {
    // });
});

const generatorTeste = async() => {
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
// foo()
server.listen(3000);