const { scrapeService } = require("../services/scrape");

const scrapeController = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ message: "Must provide keyword" });
  }
  const results = await scrapeService(keyword);

  res.status(200).send(results);
};

module.exports = {
  scrapeController,
};
