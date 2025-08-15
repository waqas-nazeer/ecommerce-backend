const { type } = require("express/lib/response");
const { DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    const Product = sequelize.define("product" ,{
        id : {type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true}
    })
}