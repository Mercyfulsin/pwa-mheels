module.exports = (sequelize, Sequelize) => {
  const Food = sequelize.define("food_items",{
    foodName: {
      type: Sequelize.STRING,
      required: true
    },
    price: {
      type: Sequelize.DOUBLE(100,2),
      required: true,
      defaultValue: 1.00
    },
    description: {
      type: Sequelize.STRING
    },
    popular: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }
  });

  return Food;
};