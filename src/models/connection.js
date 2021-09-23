const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = connection;