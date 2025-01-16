#!/bin/bash

# Load NVM (Node Version Manager)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use the stable version of Node.js
nvm use stable

# Grant permissions to Node.js
sudo setcap cap_net_raw+ep $(which node)

# Run your Node.js application
node .
