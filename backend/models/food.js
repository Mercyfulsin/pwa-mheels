const { Sequelize } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Food = sequelize.define("food_items",{
    foodName: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE(100,2)
    },
    description: {
      type: Sequelize.STRING
    },
    popular: {
      type: Sequelize.BOOLEAN,
      defaultValue: FALSE
    }
  });

  return Food;
};