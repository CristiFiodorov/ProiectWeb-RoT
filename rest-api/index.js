require('dotenv').config();

const mongoose = require('mongoose');

const { ServerManager } = require('./config/server-manager');

const {  findAllQuestions, findQuestionById, createQuestion, deleteQuestion, patchQuestion } = require('./controllers/questions-controller');
const { createTest, findAllTests, findTestById, findTestByIndex, patchTest, deleteTest } = require('./controllers/test-controller');

const { getSignCategories, getSignCategoryById, createSignCategoryController, deleteSignCategoryByIdController, updateSignCategoryByIdController, getSignCategoriesInCSV, getSignCategoriesInJSON } = require('./controllers/signcategories-controller');
const { getSignsByCategoryId, getSignById, getNextSignByCategory, getPrevSignByCategory, createSignController, deleteSignByIdController, updateSignByIdController, getAllSigns, getSignsByCategoryIdInCSV, getSignsByCategoryIdInJSON } = require('./controllers/sign-controller');

const { getAllCourses, getCourseById, createCourseController, deleteCourse, updateCourse } = require('./controllers/course-controller');

const { getAllChapters, getChapterById, createChapterController, updateChapter, deleteChapter, getPrevChapterByCourseId, getNextChapterByCourseId } = require('./controllers/chapter-controller');

const { getChapterContentByChapterId, addToChapterContentController, clearChapterContentController, deleteChapterContent, getChapterContentByChapterIdInCSV, getChapterContentByChapterIdInJSON, updateChapterContentController } = require('./controllers/chapter-content-controller');

const { getAdviceById, getAdvices, createAdviceController, deleteAdviceByIdController, updateAdviceByIdController, getNextAdvice, getPrevAdvice, getAdvicesInCSV, getAdvicesInJSON } = require('./controllers/advice-controller');

const { sendMail } = require('./utils/email-utils');
const { forgotPassword } = require('./controllers/forgot-password-controller');
const { addScoreToUser, addTestScoreToUser, userTestScores, topUsers } = require('./controllers/score-controller');

const { loginUser } = require('./controllers/login-controller');
const { registerUser } = require('./controllers/register-controller');
const { verifyToken } = require('./services/auth-service');

const { uploadFileController } = require('./controllers/file-upload-controller');


// Mongo DB connection
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// Server
const server = new ServerManager();

server.get('/api/v1/user/top', async (req, res, params) => { topUsers(req, res, params); })

server.post('/api/v1/scores', async (req, res, params) => { 
    verifyToken(req, res, params, false, addScoreToUser);
});

server.get('/api/v1/user/tests', async (req, res, params) => { 
    verifyToken(req, res, params, false, userTestScores);
});

server.post('/api/v1/scores/test', async (req, res, params) => { 
    verifyToken(req, res, params, false, addTestScoreToUser);
});

        
server.get('/api/v1/forgot/:email', async (req, res, params) => { forgotPassword(req, res, params); });

// Tests
server.post('/api/v1/tests', async (req, res, params) => { createTest(req, res, params); });
server.get('/api/v1/tests', async (req, res, params) => { findAllTests(req, res, params); });
server.get('/api/v1/tests/:id', async (req, res, params) => { findTestById(req, res, params); });
server.patch('/api/v1/tests/:id', async (req, res, params) => { patchTest(req, res, params); });
server.get('/api/v1/tests/index/:id', async (req, res, params) => { findTestByIndex(req, res, params); });
server.delete('/api/v1/tests/:id', async (req, res, params) => { deleteTest(req, res, params); });

// Questions
server.post('/api/v1/questions', async (req, res, params) => { createQuestion(req, res, params); });
server.patch('/api/v1/questions/:id', async (req, res, params) => { patchQuestion(req, res, params); });
server.get('/api/v1/questions', async (req, res, params) => { findAllQuestions(req, res, params); });
server.get('/api/v1/questions/:id', async (req, res, params) => { findQuestionById(req, res, params); });
server.delete('/api/v1/questions/:id', async (req, res, params) => { deleteQuestion(req, res, params); });

//Authentification
server.post('/api/v1/register', registerUser);
server.post('/api/v1/login', loginUser);

//Sing categories
server.get('/api/v1/signcategories', getSignCategories);
server.get('/api/v1/signcategories/:id', getSignCategoryById);
server.post('/api/v1/signcategories', async (req, res, params) => {
    verifyToken(req, res, params, true, createSignCategoryController);
});
server.delete('/api/v1/signcategories/:id', async (req, res, params) => { 
    verifyToken(req, res, params, true, deleteSignCategoryByIdController);
})
server.put('/api/v1/signcategories/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, updateSignCategoryByIdController);
});
server.get('/api/v1/export/csv/signcategories', getSignCategoriesInCSV);
server.get('/api/v1/export/json/signcategories', getSignCategoriesInJSON);


//Signs
server.get('/api/v1/signcategories/:category_id/signs', getSignsByCategoryId);
server.get('/api/v1/signs/:id', getSignById);
server.get('/api/v1/signs/nextsign/:sign_id/:category_id', getNextSignByCategory);
server.get('/api/v1/signs/prevsign/:sign_id/:category_id', getPrevSignByCategory);
server.delete('/api/v1/signs/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, deleteSignByIdController);
});
server.put('/api/v1/signs/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, updateSignByIdController);
});
server.post('/api/v1/signs', async (req, res, params) => {
    verifyToken(req, res, params, true, createSignController);
});
server.get('/api/v1/signs', getAllSigns);
server.get('/api/v1/export/csv/signcategories/:category_id/signs', getSignsByCategoryIdInCSV);
server.get('/api/v1/export/json/signcategories/:category_id/signs', getSignsByCategoryIdInJSON);



//Courses
server.get('/api/v1/courses', getAllCourses);
server.get('/api/v1/courses/:id', getCourseById);
server.post('/api/v1/courses', async (req, res, params) => {
    verifyToken(req, res, params, true, createCourseController);
});
server.put('/api/v1/courses/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, updateCourse);
});
server.delete('/api/v1/courses/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, deleteCourse);
});


//Chapters
server.get('/api/v1/courses/:course_id/chapters', getAllChapters);
server.get('/api/v1/chapters/:chapter_id', getChapterById);
server.get('/api/v1/chapters/prevchapter/:chapter_id/:course_id', getPrevChapterByCourseId);
server.get('/api/v1/chapters/nextchapter/:chapter_id/:course_id', getNextChapterByCourseId);
server.post('/api/v1/chapters', async (req, res, params) => {
    verifyToken(req, res, params, true, createChapterController);
});
server.put('/api/v1/chapters/:chapter_id', async (req, res, params) => {
    verifyToken(req, res, params, true, updateChapter);
});
server.delete('/api/v1/chapters/:chapter_id', async (req, res, params) => {
  verifyToken(req, res, params, true, deleteChapter);
});


//ChapterContent
server.get('/api/v1/chapters/:chapter_id/contents', getChapterContentByChapterId);
server.put('/api/v1/chapters/:chapter_id/contents/append', async (req, res, params) => {
    verifyToken(req, res, params, true, addToChapterContentController);
});
server.delete('/api/v1/chapters/:chapter_id/clear', async (req, res, params) => {
    verifyToken(req, res, params, true, clearChapterContentController);
});
server.delete('/api/v1/chapters/:chapter_id/contents', async (req, res, params) => {
    verifyToken(req, res, params, true, deleteChapterContent);
});
server.put('/api/v1/chapters/:chapter_id/contents', async (req, res, params) => {
    verifyToken(req, res, params, true, updateChapterContentController);
});
server.get('/api/v1/export/csv/chapters/:chapter_id/contents', getChapterContentByChapterIdInCSV);
server.get('/api/v1/export/json/chapters/:chapter_id/contents', getChapterContentByChapterIdInJSON);



//Advices
server.get('/api/v1/advices', getAdvices);
server.get('/api/v1/advices/:id', getAdviceById);
server.get('/api/v1/advices/nextadvice/:advice_id', getNextAdvice);
server.get('/api/v1/advices/prevadvice/:advice_id', getPrevAdvice);
server.post('/api/v1/advices', async (req, res, params) => {
    verifyToken(req, res, params, true, createAdviceController);
});
server.delete('/api/v1/advices/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, deleteAdviceByIdController);
});
server.put('/api/v1/advices/:id', async (req, res, params) => {
    verifyToken(req, res, params, true, updateAdviceByIdController);
});
server.get('/api/v1/export/csv/advices', getAdvicesInCSV);
server.get('/api/v1/export/json/advices', getAdvicesInJSON);


//Upload
server.post('/api/v1/upload', async (req, res, params) => {
    verifyToken(req, res, params, true, uploadFileController);
});


server.listen(3000);