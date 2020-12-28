const { INTEGER, STRING, BOOLEAN, ARRAY } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Vendors = sequelize.define("vendors",{
      vendorName: { type: STRING, required: true },
      owner: { type: STRING, required: true },
      ownerId: { type: STRING, required: true },
      menu: { menu_id: INTEGER },
      categories: ARRAY(STRING),
      customTweet: { type: STRING, default: '' },
      tweetTable: { type: Schema.Types.ObjectId, ref: "TweetTable" },
      location: ARRAY(STRING),
      hashtags: ARRAY(STRING),
      city: STRING,
      state: STRING,
      status: { type: BOOLEAN, required: true, default: false }, //False = closed ; True = open
      closingTime: STRING
    });
  
    return Vendors;
  };