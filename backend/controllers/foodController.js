const db = require("../models");
const Food = db.food_items;
const Op = db.sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Check if empty
  if (!req.body.foodName){
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //Create Food
  const food_items = {
    foodName: req.body.foodName,
    price: req.body.price,
    description: req.body.description,
    popular: req.body.popular
  }

  // Save Food in DB
  Food.create(food)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Unknown error occured while saving."
    });
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const foodName = req.query.foodName;
  let condition = foodName ? { foodName: { [Op.like]: `%${foodName}%` }} : null;
  Food.findAll({ where: condition })
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Unknown error occured while retrieving data."
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};