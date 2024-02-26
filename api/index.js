const express = require("express");
const cors = require("cors");
const router = require("./src/routes/scrape");

const app = express();
const port = 8000;

//entry point

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.listen(port, async () => {
  try {
    console.log("success");
  } catch (err) {
    console.log(err);
  }
});
