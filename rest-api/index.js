require('dotenv').config();

const mongoose = require('mongoose');

const { ServerManager } = require('./config/server-manager');

const {  findAllQuestions, findQuestionById, createQuestion, deleteQuestion, patchQuestion } = require('./controllers/questions-controller');
const { createTest, findAllTests, findTestById, findTestByIndex, patchTest, deleteTest } = require('./controllers/test-controller');

const { getSignCategories, createSignCategoryController, deleteSignCategoryByIdController, updateSignCategoryByIdController } = require('./controllers/signcategories-controller');
const { getSignsByCategory, getSignById, getNextSignByCategory, getPrevSignByCategory, createSignController, deleteSignByIdController, updateSignByIdController } = require('./controllers/sign-controller');

const { getAllCourses, createCourseController, deleteCourse, updateCourse } = require('./controllers/course-controller');

const { getAllChapters, deleteChapter, getChapterById, getPrevChapterByCourseId, getNextChapterByCourseId } = require('./controllers/chapter-controller');

const { getChapterContentByChapterId, deleteChapterContent } = require('./controllers/chapter-content-controller');

const { loginUser } = require('./controllers/login-controller');
const { registerUser } = require('./controllers/register-controller');
const { verifyToken } = require('./services/auth-service');
const { generateNrTests } = require('./utils/random-test-utils');

const Question = require('./models/question-schema');
const server = new ServerManager();

mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const { getAdviceById, getAdvices, createAdviceController, deleteAdviceByIdController, updateAdviceByIdController, getNextAdvice, getPrevAdvice } = require('./controllers/advice-controller');
const { saveTestByQuestions } = require('./services/test-service');
const { sendMail } = require('./utils/email-utils');
const { forgotPassword } = require('./controllers/forgot-password-controller');

//TODO case when entity not found
server.get('/api/v1/forgot/:email', async (req, res, params) => { forgotPassword(req, res, params); });
server.post('/tests', async (req, res, params) => { createTest(req, res, params); });
server.get('/tests', async (req, res, params) => { findAllTests(req, res, params); });
server.get('/tests/:id', async (req, res, params) => { findTestById(req, res, params); });
server.patch('/tests/:id', async (req, res, params) => { patchTest(req, res, params); });
server.get('/tests/index/:id', async (req, res, params) => { findTestByIndex(req, res, params); });
server.delete('/tests/:id', async (req, res, params) => { deleteTest(req, res, params); });

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
server.delete('/api/v1/signs/:id', deleteSignByIdController);
server.put('/api/v1/signs/:id', updateSignByIdController);

server.get('/api/v1/signs/nextsign/:sign_id/:category_id', getNextSignByCategory);
server.get('/api/v1/signs/prevsign/:sign_id/:category_id', getPrevSignByCategory);

server.post('/api/v1/signs', createSignController);


server.get('/api/v1/courses', getAllCourses);
server.post('/api/v1/courses', createCourseController);
server.put('/api/v1/courses/:id', updateCourse);
server.delete('/api/v1/courses/:id', deleteCourse);

server.get('/api/v1/courses/:course_id/chapters', getAllChapters);
server.delete('/api/v1/chapters/:chapter_id', deleteChapter);

server.get('/api/v1/chapters/:chapter_id', getChapterById);
server.get('/api/v1/chapters/:chapter_id/contents', getChapterContentByChapterId);

server.get('/api/v1/chapters/prevchapter/:chapter_id/:course_id', getPrevChapterByCourseId);
server.get('/api/v1/chapters/nextchapter/:chapter_id/:course_id', getNextChapterByCourseId);

server.delete('/api/v1/chapters/:chapter_id/contents', deleteChapterContent);

server.get('/api/v1/advices', getAdvices);
server.get('/api/v1/advices/:id', getAdviceById);
server.post('/api/v1/advices', createAdviceController);
server.delete('/api/v1/advices/:id', deleteAdviceByIdController);
server.put('/api/v1/advices/:id', updateAdviceByIdController);
server.get('/api/v1/advices/nextadvice/:advice_id', getNextAdvice);
server.get('/api/v1/advices/prevadvice/:advice_id', getPrevAdvice);

server.get('/api/v1/test', async (req, res) => {
    // verifyToken(req, res, async () => {
    // });
});
// generateNrTests(1);

server.listen(3000);