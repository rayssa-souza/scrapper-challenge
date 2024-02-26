const express = require("express");
const app = express();
const router = express.Router();
const { scrapeController } = require("../controllers/scrape");

router.get("/scrape", scrapeController);

module.exports = router;
