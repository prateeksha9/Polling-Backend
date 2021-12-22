const express = require("express");
const router = express.Router();
const app = express();
const OptionController = require("../controllers/option_controller");

router.post("/:id/add_vote", OptionController.addVote);
router.get("/:id/delete", OptionController.deleteOption);
// router.get("/:id", )

module.exports = router;
