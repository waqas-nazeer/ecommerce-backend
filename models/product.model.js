const { type } = require("express/lib/response");
const { DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Product = sequelize.define("product" ,{
        id : {type: DataTypes.INTEGER, 
            autoIncrement: true,
             primaryKey:true},
         name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
     imageUrl: {  
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Product;
    }
