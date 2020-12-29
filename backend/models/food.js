const { DOUBLE, STRING, BOOLEAN } = require('sequelize/lib/data-types');


module.exports = (sequelize, Sequelize) => {
  const Food = sequelize.define("food_items",{
    foodName: {
      type: STRING,
      required: true
    },
    price: {
      type: DOUBLE(100,2),
      required: true,
      defaultValue: 1.00
    },
    description: {
      type: STRING
    },
    popular: {
      type: BOOLEAN,
      defaultValue: 0
    }
  });

  return Food;
};