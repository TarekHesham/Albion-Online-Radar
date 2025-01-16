const WebSocket = require("ws");
const EventCodes = require("../utils/EventCodesApp");

// BigInt to JSON for websocket
BigInt.prototype.toJSON = () => this.toString();

class NetworkManager {
  constructor(packetCapture) {
    this.packetCapture = packetCapture;
    this.server = new WebSocket.Server({ port: 5002, host: "localhost" });
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    this.server.on("listening", () => {
      this.packetCapture.on("event", this.handleEvent.bind(this));
      this.packetCapture.on("response", this.handleResponse.bind(this));
      this.packetCapture.on("request", this.handleRequest.bind(this));
    });
    this.server.on("close", () => {
      console.log("WebSocket Closed");
      this.manager.removeAllListeners();
    });
  }

  handleEvent(dictonary) {
    const eventCode = dictonary["parameters"][252];

    this.server.clients.forEach((client) => {
      if (
        [
          EventCodes.EventCodes.NewCharacter,
          EventCodes.EventCodes.Leave,
        ].includes(eventCode)
      ) {
        client.send(
          JSON.stringify({
            code: "items",
            dictionary: JSON.stringify(dictonary),
          })
        );
      } else {
        client.send(
          JSON.stringify({
            code: "event",
            dictionary: JSON.stringify(dictonary),
          })
        );
      }
    });
  }

  handleResponse(dictonary) {
    this.server.clients.forEach(function (client) {
      client.send(
        JSON.stringify({
          code: "response",
          dictionary: JSON.stringify(dictonary),
        })
      );
    });
  }

  handleRequest(dictonary) {
    this.server.clients.forEach(function (client) {
      client.send(
        JSON.stringify({
          code: "request",
          dictionary: JSON.stringify(dictonary),
        })
      );
    });
  }
}

module.exports = { NetworkManager };
