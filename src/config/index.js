require('dotenv').config();

module.exports.Config={
    port:process.env.PORT,
    mongo_conexion:process.env.MONGO_CONEXION,
    mongo_db:process.env.MONGO_DB
}
