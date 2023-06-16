require('dotenv').config();

const mongoose = require('mongoose');

const { ServerManager } = require('./config/server-manager');
const {  findAllQuestions, findQuestionById, createQuestion, deleteQuestion, patchQuestion } = require('./controllers/questions-controller');
const { createTest, findAllTests, findTestById } = require('./controllers/test-controller');

const { loginUser } = require('./controllers/login-controller');
const { registerUser } = require('./controllers/register-controller');
const { verifyToken } = require('./services/auth-service');
const server = new ServerManager();

mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const { getSignCategories, createSignCategoryController, deleteSignCategoryByIdController, updateSignCategoryByIdController } = require('./controllers/signcategories-controller');
const { getSignsByCategory, getSignById, getNextSignByCategory, getPrevSignByCategory, createSignController, deleteSignByIdController, updateSignByIdController } = require('./controllers/sign-controller');

//TODO case when entity not found
server.post('/tests', async (req, res, params) => { createTest(req, res, params); });
server.get('/tests', async (req, res, params) => { findAllTests(req, res, params); });
server.get('/tests/:id', async (req, res, params) => { findTestById(req, res, params); });

server.post('/questions', async (req, res, params) => { createQuestion(req, res, params); });
server.patch('/questions/:id', async (req, res, params) => { patchQuestion(req, res, params); });
server.get('/questions', async (req, res, params) => { findAllQuestions(req, res, params); });
server.get('/questions/:id', async (req, res, params) => { findQuestionById(req, res, params); });
server.delete('/questions/:id', async (req, res, params) => { deleteQuestion(req, res, params); });


server.post('/api/v1/register', registerUser);

server.post('/api/v1/login', loginUser);

server.get('/api/v1/signcategories', getSignCategories);
server.post('/api/v1/signcategories', createSignCategoryController);
server.delete('/api/v1/signcategories/:id', deleteSignCategoryByIdController);
server.put('/api/v1/signcategories/:id', updateSignCategoryByIdController);

server.get('/api/v1/:category_id/signs', getSignsByCategory);
server.get('/api/v1/signs/:id', getSignById);
server.get('/api/v1/signs/nextsign/:sign_id/:category_id', getNextSignByCategory);
server.get('/api/v1/signs/prevsign/:sign_id/:category_id', getPrevSignByCategory);
server.post('/api/v1/signs', createSignController);
server.delete('/api/v1/signs/:id', deleteSignByIdController);
server.put('/api/v1/signs/:id', updateSignByIdController);


server.get('/api/v1/test', async (req, res) => {
    // verifyToken(req, res, async () => {
    // });
});

server.listen(3000);