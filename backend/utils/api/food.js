const router = require("express").Router();
const foodController = require("../../controllers/foodController");

// Matches with "/api/food"
router.route("/")
  // Grabs all food items in existence
  .get(foodController.findAllWithName)
  // Creates a new Food item (takes an obj with food obj and menu id as ref to relate the two)
  .post(foodController.create)
  .delete(foodController.deleteAll);

// Matches with "/api/food/:id"
router
  .route("/:obj")
  .get(foodController.findOne)
  .put(foodController.update)
  .delete(foodController.delete);

module.exports = router;
