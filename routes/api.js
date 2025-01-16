const { readFile, writeFile } = require("fs");
const { join } = require("path");
const mobsFilePath = join(__dirname, "../config/mobsInfo.json");
const { json } = require("express");

module.exports = (app) => {
  app.use(json());
  // API endpoints
  app.post("/api/edit-mob", (req, res) => {
    const { mob } = req.body;

    if (!mob || !mob.id) {
      return res.status(400).json({ error: "Invalid data" });
    }

    readFile(mobsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Could not read data" });
      }

      if (!data || data.trim() === "") {
        console.error("Empty data in file");
        return res.status(400).json({ error: "File is empty" });
      }

      let mobs = [];
      try {
        mobs = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return res.status(500).json({ error: "Invalid JSON format" });
      }

      const mobIndex = mobs.findIndex((m) => m.id == mob.id);
      if (mobIndex !== -1) {
        mobs[mobIndex] = mob;
      } else {
        return res.status(404).json({ error: "Mob not found" });
      }

      writeFile(mobsFilePath, JSON.stringify(mobs, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ error: "Could not save data" });
        }

        return res.status(200).json({ message: "Mob saved successfully" });
      });
    });
  });

  app.post("/api/add-mob", (req, res) => {
    const { mob } = req.body;

    if (!mob || !mob.id || !mob.tier) {
      return res
        .status(400)
        .json({ error: "Invalid data: ID and Tier are required" });
    }

    readFile(mobsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Could not read data" });
      }

      let mobs = JSON.parse(data);

      const mobExists = mobs.some((m) => m.id === parseInt(mob.id, 10));
      if (mobExists) {
        return res
          .status(400)
          .json({ error: "Mob with this ID already exists" });
      }

      const newMob = {
        id: parseInt(mob.id, 10),
        tier: parseInt(mob.tier, 10),
        name: mob.name,
        type: mob.type,
      };

      mobs.push(newMob);

      writeFile(mobsFilePath, JSON.stringify(mobs, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ error: "Could not save data" });
        }

        res.status(201).json({ message: "Mob added successfully" });
      });
    });
  });

  app.delete("/api/delete-mob/:id", (req, res) => {
    const mobId = parseInt(req.params.id, 10);

    if (isNaN(mobId)) {
      return res.status(400).json({ error: "Invalid Mob ID" });
    }

    readFile(mobsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Could not read data" });
      }

      if (!data || data.trim() === "") {
        console.error("Empty data in file");
        return res.status(400).json({ error: "File is empty" });
      }

      let mobs = JSON.parse(data);

      const filteredMobs = mobs.filter((mob) => mob.id !== mobId);

      if (filteredMobs.length === mobs.length) {
        return res.status(404).json({ error: "Mob not found" });
      }

      writeFile(
        mobsFilePath,
        JSON.stringify(filteredMobs, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing file:", writeErr);
            return res.status(500).json({ error: "Could not save data" });
          }

          res.status(200).json({ message: "Mob deleted successfully" });
        }
      );
    });
  });
};
