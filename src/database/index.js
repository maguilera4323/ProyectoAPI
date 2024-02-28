const {MongoClient}=require('mongodb')
const debug=require('debug')('app:module-database')
const{Config}=require('../config/index')

let connection;

module.exports.Database = (collection) => new Promise(async (resolve, reject) => {
    try {
        if (!connection) {
            const client = new MongoClient(Config.mongo_conexion);
            connection = await client.connect();
            debug('Nueva conexión realizada');
        } else {
            debug('Reutilizando conexión');
        }
        const db = connection.db(Config.mongo_db);
        resolve(db.collection(collection));
    } catch (error) {
        reject(error);
    }
});