const ServerManager = require('./config/server-manager');

const server = new ServerManager();

server.get('/', (req, res) => {
    res.write("Api Works")
    res.end()
});

server.listen(3000);