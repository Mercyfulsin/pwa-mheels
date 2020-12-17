require("dotenv").config();
const mongoose = require("mongoose");
const Thing = mongoose.Types.ObjectId;
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/vendorlist"
);

// Created Seeds for our google auth accounts with fake starting Menu's.
// For presentation we can show both an already created || Creating new Menu
const vendorSeed = [
  {
    storeName: "Los Tacos",
    owner: "Hanna Tefera (G)",
    ownerId: "google-oauth2|112903226627832526877",
    menu: Thing("000000000000000000000001"),
    categories: ["Tacos", "Mexican", "TJ"],
    hashtags: ["#lostacos","#tacos"],
    location: [0,0],
    status: false,
    closingTime: "8pm"
  },
  {
    storeName: "The Tacos",
    owner: "Ernie Sanchez (G)",
    menu: Thing("000000000000000000000002"),
    ownerId: "google-oauth2|108652893752770055277",
    categories: ["Tacos", "Fancy"],
    hashtags: ["#tacotuesday","#tacos"],
    location: [0,0],
    status: false,
    closingTime: "6pm"
  },
  {
    storeName: "Tacos-r-us",
    owner: "Andres Ruiz (G)",
    menu: Thing("000000000000000000000003"),
    ownerId: "google-oauth2|105235722484386154166",
    categories: ["Tacos", "Chicano", "TJ"],
    location: [0,0],
    status: false,
    closingTime: "8pm"
  },
  {
    storeName: "Los 3 Tacos",
    owner: "Raul Gonzalez (G)",
    menu: Thing("000000000000000000000004"),
    ownerId: "google-oauth2|105492094761663677396",
    categories: ["Tacos", "Mexican", "TJ", "Cheap"],
    hashtags: ["#lostacos","#tacos", "#tjtacos"],
    location: [0,0],
    status: false,
    closingTime: "1am"
  }
];

const menuSeed = [
  {
    _id: Thing("000000000000000000000001"),
    menuName: "El Menu",
    food: [Thing("000000000000000000000001"), Thing("000000000000000000000002")]
  },
  {
    _id: Thing("000000000000000000000002"),
    menuName: "The Menu",
    food: [Thing("000000000000000000000003"), Thing("000000000000000000000004")]
  },
  {
    _id: Thing("000000000000000000000003"),
    menuName: "Echate Algo Guey",
    food: [Thing("000000000000000000000005"),Thing("000000000000000000000006"),Thing("000000000000000000000007")]
  },
  {
    _id: Thing("000000000000000000000004"),
    menuName: "Echate Algo Guey",
    food: [Thing("000000000000000000000008"),Thing("000000000000000000000009"),Thing("000000000000000000000010")]
  }
];

const foodSeed = [
  {
    _id: Thing("000000000000000000000001"),
    foodName: "Quesadilla",
    price: 5.00,
    description: "It's cheese and tortilla."
  },
  {
    _id: Thing("000000000000000000000002"),
    foodName: "Flan",
    price: 3.00,
    description: "God's gift to earth."
  },
  {
    _id: Thing("000000000000000000000003"),
    foodName: "Tacos Veganos",
    price: 6.99
  },
  {
    _id: Thing("000000000000000000000004"),
    foodName: "Tacos De Pollo",
    price: 2.99
  },
  {
    _id: Thing("000000000000000000000005"),
    foodName: "Tacos Al Pastor",
    price: 2.99
  },
  {
    _id: Thing("000000000000000000000006"),
    foodName: "Tacos De Birria",
    price: 3.99
  },
  {
    _id: Thing("000000000000000000000007"),
    foodName: "Tacos De Buche",
    price: 2.99
  },
  {
    _id: Thing("000000000000000000000008"),
    foodName: "Tacos De Perro",
    price: 4.99
  },
  {
    _id: Thing("000000000000000000000009"),
    foodName: "Tacos Al Vapor",
    price: 2.49
  },
  {
    _id: Thing("000000000000000000000010"),
    foodName: "Mini Tacos",
    price: 0.99
  }
];

db.Vendor
  .remove({})
  .then(() => db.Vendor.collection.insertMany(vendorSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


  // Create Menu
  db.Menu
  .remove({})
  .then(() => db.Menu.collection.insertMany(menuSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // Create Food
  db.Food
  .remove({})
  .then(() => db.Food.collection.insertMany(foodSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
