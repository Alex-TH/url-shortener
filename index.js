const App = require('./app');
const Store = require('./store');

if (!process.env.ENVIRONMENT) {
    (require('node-env-file'))('./.env');
}

const port = 3000;
const dbConfig = { uri: process.env.DB_URI };

Store(dbConfig)
.then(res => App(res.store).listen(port, () => console.log(`Application started at port ${port}`)))
.catch(console.log);
