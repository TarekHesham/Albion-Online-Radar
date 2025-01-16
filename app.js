// Initialize express
const express = require("express");
const app = express();
const port = 5001;

// Initialize routes
const routes = require("./routes/routes");
const api = require("./routes/api");

// Initialize services
const { join } = require("path");
const { PacketCapture } = require("./scripts/server-scripts/packet-capture");
const { NetworkManager } = require("./scripts/server-scripts/network-manager");

// Configure static assets and views
app.use("/scripts", express.static(join(__dirname, "scripts")));
app.use("/images", express.static(join(__dirname, "images")));
app.use("/sounds", express.static(join(__dirname, "sounds")));
app.use("/config", express.static(join(__dirname, "config")));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

// Initialize services and routes
StartRadar();
routes(app);
api(app);

// Listen on the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  require("child_process").exec(`start http://localhost:${port}`);
});

function StartRadar() {
  const packetCapture = new PacketCapture();
  packetCapture.startCapture();

  new NetworkManager(packetCapture.manager);
}
