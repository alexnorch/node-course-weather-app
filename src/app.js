const express = require("express");
const getGeoCode = require("../utils/geocode.js");
const forecast = require("../utils/forecast.js");
const hbs = require("hbs");
const path = require("path");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Olehandro Ukraine",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Olehandro Ukraine",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Olehandro Harashchenko",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    errorText: "We cant find the article with this ID",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      err: "Please provide an address",
    });
  }

  getGeoCode(address, (err, { longitude, latitude, location } = {}) => {
    if (err) return res.send({ err });
    forecast(longitude, latitude, (err, forecastData) => {
      if (err) return res.send({ err });
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    errorText: "We cant find the page you are looking for",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
