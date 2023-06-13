require('dotenv').config();

const mongoose = require('mongoose');

const ServerManager = require('./config/server-manager');
const { registerUser } = require('./controllers/register-controller');

const server = new ServerManager(); 

mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('connected', () => console.log('Connected to database'));

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });


server.post('/register', async (req, res) => {
    registerUser(req, res);
});

server.listen(3000);