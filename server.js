const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Hardcoded latitude and longitude values
const LAT1 = "18.9684285";
const LNG1 = "73.0234408";
const LAT2 = "12.9351929";
const LNG2 = "77.62448069999999";

// Proxy endpoint for the first Swiggy URL
app.get("/resdetails", (req, res) => {
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9684285&lng=73.0234408&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  request({ url }, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

// Proxy endpoint for the second Swiggy URL
app.get("/api/swiggy-menu", (req, res) => {
  const { restaurantId } = req.query;
  if (!restaurantId) {
    return res.status(400).send("restaurantId is required");
  }
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT2}&lng=${LNG2}&restaurantId=${restaurantId}`;

  request({ url }, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
