

const dbConfig = require('../config/db.config');

const {Sequelize, DataTypes } = require ('sequelize')

const sequelize = new Sequelize(

    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,

    {
        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        port : dbConfig.PORT,
        logging : false,
    }
);


sequelize.authenticate()
  .then(() => console.log(' MySQL connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));




const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Datatype
db.user = require('./user.model')(sequelize,DataTypes);

db.sequelize.sync({alter : true})
.then(() => {
    console.log('ALL models were  synchonized sucessfully');
    
})
.catch ( err => { console.log('error synchonized model', err)
});


module.exports = db;