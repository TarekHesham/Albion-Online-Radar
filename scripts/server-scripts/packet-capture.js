const { Cap, decoders } = require("cap");
const PhotonParser = require("../classes/PhotonPacketParser");
const { existsSync, readFileSync } = require("fs");
const { getAdapterIp } = require("./adapter-selector");

class PacketCapture {
  constructor() {
    this.cap = new Cap();
    this.manager = new PhotonParser();
    this.adapterIp = null;
  }

  startCapture() {
    this.handelAdapterIp();

    let device = Cap.findDevice(this.adapterIp);

    while (!device) {
      console.clear();
      console.log("\nLast adapter is not working, please choose a new one.\n");
      this.adapterIp = getAdapterIp();
      device = Cap.findDevice(this.adapterIp);
    }

    const filter = "udp and (dst port 5056 or src port 5056)";
    const bufSize = 4096;
    const buffer = Buffer.alloc(bufSize);

    this.cap.open(device, filter, bufSize, buffer);
    this.cap.setMinBytes && this.cap.setMinBytes(0);

    this.cap.on("packet", (nbytes) => {
      const ret = decoders.Ethernet(buffer);
      const ipRet = decoders.IPV4(buffer, ret.offset);
      const udpRet = decoders.UDP(buffer, ipRet.offset);

      const payload = buffer.slice(udpRet.offset, nbytes);
      this.handlePayload(payload);
    });
  }

  handlePayload(payload) {
    try {
      this.manager.handle(payload);
    } catch (error) {
      console.error("Error processing the payload:", error);
    }
  }

  handelAdapterIp() {
    if (existsSync("./config/ip.txt")) {
      this.adapterIp = readFileSync("./config/ip.txt", {
        encoding: "utf-8",
        flag: "r",
      });
    }

    if (!this.adapterIp) {
      this.adapterIp = getAdapterIp();
    } else {
      console.log(
        `\nUsing last adapter selected - ${this.adapterIp}\nIf you want to change adapter, delete the  "ip.txt"  file.\n`
      );
    }

    return this.adapterIp;
  }
}

module.exports = { PacketCapture };
