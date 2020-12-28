const db = require("../models");
const Vendor = db.menu_entries;
const Op = db.sequelize.Op;

module.exports = {
  // Create and Save a new Vendor
  create: function (req, res) {
    // Check if empty
    if (!req.body.vendorName) {
      console.log(req);
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    //Create Vendor
    const vendors = {
      vendorName: req.body.vendorName,
      owner: req.body.owner,

    }

    // Save Vendor in DB
    Vendor.create(vendors)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Unknown error occured while saving."
        });
      });
  },

  // Retrieve all Vendor items from the DB.
  findAll: function (req, res) {
    const vendorName = req.query.vendorName;
    let condition = vendorName ? {
      vendorName: {
        [Op.like]: `%${vendorName}%`
      }
    } : null;
    Vendor.findAll({
        where: condition
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Unknown error occured while retrieving data."
        });
      });
  },

  // Find a single Vendor with an id
  findOne: function (req, res) {
    const id = req.params.id;

    Vendor.findByPk(id)
      .then(data => {

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Vendor with id=" + id
        });
      });
  }, // Update a Vendor by the id in the request
  update: function (req, res) {
    const id = req.params.id;

    Vendor.update(req.body, {
        where: {
          id: id
        }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vendor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Vendor with id=${id}. Maybe Vendor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Vendor with id=" + id
        });
      });
  },

  // Delete a Vendor with the specified id in the request
  delete: function (req, res) {
    const id = req.params.id;
    console.log("I was pinged");
    Vendor.destroy({
        where: {
          id: id
        }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vendor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Vendor with id=${id}. Maybe Vendor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Vendor with id=" + id
        });
      });
  },

  // Delete all Vendor from the database.
  deleteAll: function (req, res) {
    Vendor.destroy({
        where: {},
        truncate: false
      })
      .then(nums => {
        res.send({
          message: `${nums} Vendor were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all menu items."
        });
      });
  }
}