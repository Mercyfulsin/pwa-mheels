const db = require("../models");
const Food = db.food_items;
const Op = db.sequelize.Op;

// Create and Save a new Food
exports.create = (req, res) => {
  // Check if empty
  if (!req.body.foodName){
    console.log(req);
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
  Food.create(food_items)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Unknown error occured while saving."
    });
  });
};

// Retrieve all Food items from the DB.
exports.findAllWithName = (req, res) => {
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

// Find a single Food with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Food.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Food with id=" + id
      });
    });
};

// Update a Food by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Food.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Food with id=${id}. Maybe Food was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Food with id=" + id
      });
    });
};

// Delete a Food with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("I was pinged");
  Food.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Food with id=${id}. Maybe Food was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Food with id=" + id
      });
    });
};

// Delete all Food from the database.
exports.deleteAll = (req, res) => {
  Food.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Food were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all food items."
      });
    });
};

// Find all popular Food
exports.findAllPopular = (req, res) => {
  Food.findAll({ where: { popular: true }})
  .then(data => {
    res.send(data);
  })
  .catch(err =>{
    res.status(500).send({
      message: err.message || "Some error occured while retrieving popular foods."
    });
  });
};