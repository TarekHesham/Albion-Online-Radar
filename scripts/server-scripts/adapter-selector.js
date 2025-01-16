const { networkInterfaces } = require("os");
const { question } = require("readline-sync");
const { writeFile } = require("node:fs");
const ipFilePath = "./config/ip.txt";

module.exports = {
  getAdapterIp: () => {
    const interfaces = networkInterfaces();

    console.log(
      "\nPlease select one of the adapter that you use to connect to the internet:"
    );

    let i = 1;
    const selection = {};
    const selectionName = {};
    for (const [name, value] of Object.entries(interfaces)) {
      const detail = value.find((v) => v.family === "IPv4");
      if (!detail) continue;
      selection[i] = detail.address;
      selectionName[i] = name;
      console.log(`  ${i}. ${name}\t ip address: ${detail.address}`);
      i++;
    }

    let selectedIp;
    let selectedName;

    while (!selectedIp) {
      let userSelect = question("\nInput the number here: ");
      selectedIp = selection[userSelect];
      selectedName = selectionName[userSelect];

      console.clear();
      console.log("Invalid input, try again\n\n");
      console.log(
        "Please select one of the adapter that you use to connect to the internet:"
      );

      for (let j = 1; j < i; j++) {
        console.log(
          `  ${j}. ${selectionName[j]}\t ip address: ${selection[j]}`
        );
      }
    }

    console.log(`\nYou have selected "${selectedName} - ${selectedIp}"\n`);

    writeFile(ipFilePath, selectedIp, (err) => {
      if (err) console.log("Error when saving ip.");
    });

    return selectedIp;
  },
};
