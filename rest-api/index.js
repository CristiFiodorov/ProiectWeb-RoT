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

server.post('/api/v1/register', registerUser);

server.post('/api/v1/login', loginUser);

server.get('/api/v1/test', async (req, res) => {
    // verifyToken(req, res, async () => {
    // });
});

server.listen(3000);