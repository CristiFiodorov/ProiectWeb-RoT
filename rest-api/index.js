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

server.post('/api/v1/register', async (req, res) => {
    registerUser(req, res);
});

server.post('/api/v1/login', async (req, res) => {
    loginUser(req, res);
});

server.get('/api/v1/test', (req, res) => {
    verifyToken(req, res, () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Hello World");
    });
});

server.listen(3000);