const express = require("express");
const router = express.Router();
const app = express();
console.log("router loaded");

router.use("/question", require("./question"));
router.use("/option", require("./option"));
module.exports = router;
