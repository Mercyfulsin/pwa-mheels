const { INTEGER } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Vendors = sequelize.define("vendors",{
      vendorName: { type: Sequelize.STRING, required: true },
      owner: { type: Sequelize.STRING, required: true },
      ownerId: { type: Sequelize.STRING, required: true },
      menu: { menu_id: Sequelize.INTEGER },
      categories: Sequelize.ARRAY(Sequelize.STRING),
      customTweet: { type: Sequelize.STRING, default: '' },
      tweetTable: { type: Schema.Types.ObjectId, ref: "TweetTable" },
      location: Sequelize.ARRAY(Sequelize.STRING),
      hashtags: Sequelize.ARRAY(Sequelize.STRING),
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      status: { type: Sequelize.BOOLEAN, required: true, default: false }, //False = closed ; True = open
      closingTime: Sequelize.STRING
    });
  
    return Vendors;
  };