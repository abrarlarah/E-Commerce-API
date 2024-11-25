const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderProducts' });

module.exports = Order;
