const router = require('express').Router();
const twitterController = require('../../controllers/twitterController');

// Matches with /api/twitter
router.route("/")
    .post(twitterController.postTweet);
// router.route("/")
router.route("/:id")
    .get(twitterController.getTweet);

module.exports = router;