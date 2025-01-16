const { access } = require("fs");

module.exports = (app) => {
  // Routes
  app.get("/", (req, res) => {
    res.render("layout", { mainContent: "main/home" });
  });

  app.get("/home", (req, res) => {
    res.render("./layout", { mainContent: "main/home" });
  });

  app.get("/resources", (req, res) => {
    res.render("layout", { mainContent: "main/resources" });
  });

  app.get("/enemies", (req, res) => {
    res.render("layout", { mainContent: "main/enemies" });
  });

  app.get("/chests", (req, res) => {
    res.render("layout", { mainContent: "main/chests" });
  });

  app.get("/map", (req, res) => {
    access("./images/Maps", function (error) {
      if (error) {
        res.render("layout", { mainContent: "main/require-map" });
      } else {
        res.render("layout", { mainContent: "main/map" });
      }
    });
  });

  app.get("/mobs", (req, res) => {
    res.render("layout", { mainContent: "main/mobs" });
  });

  app.get("/ignorelist", (req, res) => {
    res.render("layout", { mainContent: "main/ignorelist" });
  });

  app.get("/settings", (req, res) => {
    res.render("layout", { mainContent: "main/settings" });
  });

  app.get("/drawing", (req, res) => {
    res.render("main/drawing");
  });

  app.get("/drawing-electron", (req, res) => {
    res.render("main/drawing-electron");
  });

  app.get("/items", (req, res) => {
    res.render("main/drawing-items");
  });
};
