const { type } = require("express/lib/response");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    deliveryDetails: {
      type : DataTypes.JSON,
      allowNull : true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

  return Order;
};
