const router = require("express").Router();
const menuController = require("../../controllers/menuController");

// Matches with "/api/menu"
router.route("/")
  // Gets all menus
  .get(menuController.findAll)
  // Creates a new Menu
  .post(menuController.create);

// Matches with "/api/menu/:id"
router
  .route("/:id")
  // Get specific menu
  .get(menuController.findById)
  // Updates menu to remove food
  .put(menuController.removeFood)
  // deletes menu obj (not used yet, when implementing remove ref from Vendor key:value)
  .delete(menuController.remove);

module.exports = router;
