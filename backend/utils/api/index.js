const router = require("express").Router();
const foodRoutes = require("./food");
// Book routes
router.use("/food", foodRoutes);
module.exports = router;
