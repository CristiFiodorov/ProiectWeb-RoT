require('dotenv').config();

const mongoose = require('mongoose');

const { ServerManager } = require('./config/server-manager');
const {  findAllQuestions, findQuestionById, createQuestion, deleteQuestion, patchQuestion } = require('./controllers/questions-controller');
const { createTest, findAllTests, findTestById } = require('./controllers/test-controller');

const server = new ServerManager();

mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// server.get('/')
// server.post('/register', async (req, res) => {
//     registerUser(req, res);
// });

// server.post('/login', async(req, res) => {

// });
//TODO case when entity not found
server.post('/tests', async (req, res, params) => { createTest(req, res, params); });
server.get('/tests', async (req, res, params) => { findAllTests(req, res, params); });
server.get('/tests/:id', async (req, res, params) => { findTestById(req, res, params); });

server.post('/questions', async (req, res, params) => { createQuestion(req, res, params); });
server.patch('/questions/:id', async (req, res, params) => { patchQuestion(req, res, params); });
server.get('/questions', async (req, res, params) => { findAllQuestions(req, res, params); });
server.get('/questions/:id', async (req, res, params) => { findQuestionById(req, res, params); });
server.delete('/questions/:id', async (req, res, params) => { deleteQuestion(req, res, params); });

server.listen(3000);