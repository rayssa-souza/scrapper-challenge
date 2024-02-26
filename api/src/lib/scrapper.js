const axios = require("axios");
const cheerio = require("cheerio");

const scrape = async (keyword) => {
  const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`, {
    headers: {
      "User-Agent":
        "User-Agent Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    },
  });

  const $ = cheerio.load(response.data);
  const results = [];
  const products = $(".s-card-container");
  products.each((i, elem) => {
    const title = $(elem)
      .find(".s-title-instructions-style h2 span")
      .text()
      .trim();
    const image = $(elem).find(".s-image").attr("src");
    const rating = $(elem)
      .find(".a-icon-star-small")
      .text()
      .split(" ")[0]
      .trim();
    const reviewCount = $(elem)
      .find("[data-csa-c-content-id=alf-customer-ratings-count-component]")
      .text()
      .trim();
    const result = {
      title,
      image,
      rating: rating || null,
      reviewCount: reviewCount || null,
    };
    results.push(result);
  });
  return results;
};

module.exports = { scrape };
