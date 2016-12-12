const env = require('node-env-file');
const { MongoClient } = require('mongodb');
const App = require('./app');
const Store = require('./store');

if (!process.env.ENVIRONMENT) {
    env('./.env');
}
const initializeDB = (config) => {
  return MongoClient.connect(config.uri)
  .then((db) => {
    return {
      success: true,
      msg: 'Db initialized',
      store: Store(db),
    };
  });
};
const port = 3000;
const dbConfig = { uri: process.env.DB_URI };

initializeDB(dbConfig)
.then(res => App(res.store).listen(port, () => console.log(`Application started at port ${port}`)))
.catch(console.log);
