const router = require('express').Router();
const tweetTableController = require('../../controllers/tweetTableController');

// Matches with /api/tweetTable
router.route("/")
    .post(tweetTableController.create);
router.route("/:id")
    .post(tweetTableController.update);

module.exports = router;