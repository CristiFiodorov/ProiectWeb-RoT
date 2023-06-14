require('dotenv').config();

const mongoose = require('mongoose');

const ServerManager = require('./config/server-manager');
const { loginUser } = require('./controllers/login-controller');
const { registerUser } = require('./controllers/register-controller');
const { verifyToken } = require('./services/auth-service');
const server = new ServerManager();

mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const { getSignCategories } = require('./controllers/signcategories-controller');
const { getSignsByCategory } = require('./controllers/sign-controller');

server.post('/api/v1/register', async (req, res) => {
    registerUser(req, res);
});

server.post('/api/v1/login', async (req, res) => {
    console.log('login' + req);
    loginUser(req, res);
});

server.get('/api/v1/signcategories', async (req, res) => {
    verifyToken(req, res, async () => {
        getSignCategories(req, res);
    });
});

server.get('/api/v1/signs', async (req, res) => {
    verifyToken(req, res, async () => {
        getSignsByCategory(req, res);
    });
});


server.get('/api/v1/test', async (req, res) => {
    // verifyToken(req, res, async () => {
    // });
});

server.listen(3000);