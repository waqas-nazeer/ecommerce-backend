

  module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
      {
      freezeTableName: true,
      timestamps: false
    }
  );

    return OrderItem;
  };
