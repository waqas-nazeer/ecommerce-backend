

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

// Models
db.user = require('./user.model')(sequelize,DataTypes);
db.product = require('./product.model')(sequelize,DataTypes);
db.cart = require('./cart.model')(sequelize,DataTypes);
db.order = require('./order.model')(sequelize,DataTypes);
db.orderItems = require('./orderitem.model')(sequelize,DataTypes);

// Associations
db.cart.belongsTo(db.product, { foreignKey: 'productId', as: 'product' });
db.product.hasMany(db.cart, { foreignKey: 'productId', as: 'cartItems' });

// Order → OrderItems
db.order.hasMany(db.orderItems, { foreignKey: 'orderId', as: 'items' });
db.orderItems.belongsTo(db.order, { foreignKey: 'orderId' });

// Optional: Product details in OrderItems
db.product.hasMany(db.orderItems, { foreignKey: 'productId', as: 'orderItems' });
db.orderItems.belongsTo(db.product, { foreignKey: 'productId', as: 'product' });

db.sequelize.sync({ alter: true })
.then(() => {
    console.log('ALL models were  synchonized sucessfully');                
    
})  
.catch ( err => { console.log('error synchonized model', err)
});


module.exports = db;