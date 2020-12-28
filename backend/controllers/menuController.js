const db = require("../models");
const Menu = db.menu_entries;
const Op = db.sequelize.Op;

// Create and Save a new Menu
exports.create = (req, res) => {
  // Check if empty
  if (!req.body.menuName){
    console.log(req);
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //Create Menu
  const menu_entries = {
    menuName: req.body.menuName,
    menu_id: req.body.menu_id
  }

  // Save Menu in DB
  Menu.create(menu_entries)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Unknown error occured while saving."
    });
  });
};

// Retrieve all Menu items from the DB.
exports.findAll = (req, res) => {
  const menuName = req.query.menuName;
  let condition = menuName ? { menuName: { [Op.like]: `%${menuName}%` }} : null;
  Menu.findAll({ where: condition })
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Unknown error occured while retrieving data."
    });
  });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Menu.findByPk(id)
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Menu with id=" + id
      });
    });
};

// Update a Menu by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Menu was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Menu with id=" + id
      });
    });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("I was pinged");
  Menu.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Menu was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Menu with id=" + id
      });
    });
};

// Delete all Menu from the database.
exports.deleteAll = (req, res) => {
  Menu.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Menu were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all menu items."
      });
    });
};