const { INTEGER, STRING } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu_entries",{
      menuName: {
        type: STRING,
        required: true
      },
      food_id: [{
        id: INTEGER
      }]
    });
  
    return Menu;
  };