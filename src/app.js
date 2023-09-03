const path = require("path");
const express = require("express");
// const { title } = require("process");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const { error } = require("console");
const forecast = require("./utils/forecast");

const app = express();

//define paths for expres config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static to server
app.use(express.static(publicDirectoryPath));
//local host(home)
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rijad Qerimi",
  });
});
//about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Rijad Qerimi",
  });
});
//help
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Rijad Qerimi",
  });
});
//weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// res.send({
//   forecast: "its raining",
//   location: "ferizaj",
//   address: req.query.address,
// });

//products
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});
//help/*
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rijad Qerimi",
    errorMessage: "Help Article not founded",
  });
});
//** */
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rijad Qerimi",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
