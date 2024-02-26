const { scrape } = require("../lib/scrapper");

const scrapeService = async (keyword) => {
  return scrape(keyword);
};

module.exports = {
  scrapeService,
};
