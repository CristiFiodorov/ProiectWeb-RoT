require('dotenv').config();

const mongoose = require('mongoose');

const { ServerManager } = require('./config/server-manager');
const { registerUser } = require('./controllers/register-controller');
const { getAllQuestions, findAllQuestions, findQuestionById, createQuestion } = require('./controllers/questions-controller');
const { sendJsonResponse } = require('./utils/response-utils');
const { Response } = require('./utils/response-class');

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

server.post('/questions', async (req, res, params) => { createQuestion(req, res, params); });
server.get('/questions', async (req, res, params) => { findAllQuestions(req, res, params); });
server.get('/questions/:id', async (req, res, params) => { findQuestionById(req, res, params); });

server.listen(3000);