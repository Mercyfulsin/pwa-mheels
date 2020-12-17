const router = require("express").Router();
const foodRoutes = require("./food");
const menuRoutes = require("./menu");
const vendorRoutes = require("./vendor");
const twitterRoutes = require('./twitter');
const tweetTableRoutes = require("./tweetTable");
// Book routes
router.use("/food", foodRoutes);
router.use("/menu", menuRoutes);
router.use("/vendor", vendorRoutes);
router.use("/twitter", twitterRoutes);
router.use("/tweetTable", tweetTableRoutes);
module.exports = router;
