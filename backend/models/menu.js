module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu_entries",{
      menuName: {
        type: Sequelize.STRING,
        required: true
      },
      food_id: [{
        id: Sequelize.INTEGER
      }]
    });
  
    return Menu;
  };