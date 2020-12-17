require("dotenv").config();
const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/vendorlist"
);


// // This will populate the Vendor with Menu, but Menu doesn't have food items populated
// console.log("========= POPULATING Menu INTO Vendor WITHOUT Food ===============");
// console.log("========= POPULATING Menu INTO Vendor WITHOUT Food ===============");
// console.log("========= POPULATING Menu INTO Vendor WITHOUT Food ===============");
// db.Vendor.find({})
//   .populate("menu")
//   .then(dbResult => {
//     dbResult.forEach(content => {
//       console.log("================================");
//       console.log(content);
//     });
//     process.exit(0);
//   });

console.log("========= POPULATING Menu INTO Vendor WITH Food ===============");
db.Vendor
  .find({})
  .populate({
    path: 'menu',
    populate: {
      path: 'food'
    }
  })
  .exec(function (err, res) {
    if (err) throw err;
    console.log(res);
    res.forEach(content => {
      let keys = Object.keys(content.toJSON());
      console.log(`======== ${content['storeName']} ==========`);
      keys.forEach(i => {
        console.log(`${i} : ${content[i]}`);
      })
    });
    process.exit(0);
  });