class Player {
    constructor(posX, posY, id, nickname, guildName1, currentHealth, initialHealth, items, flagId) {
        this.posX = posX;
        this.posY = posY;
        this.oldPosX = posX;
        this.oldPosY = posY;
        this.id = id;
        this.nickname = nickname;
        this.guildName = guildName1;
        this.hX = 0;
        this.hY = 0;
        this.currentHealth = currentHealth;
        this.initialHealth = initialHealth;
        this.items = items;
        this.flagId = flagId;
        this.mounted = false; // Initialize mounted status as false
    }

    setMounted(mounted) {
        this.mounted = mounted;
    }
}

export class PlayersHandler {
    constructor(settings) {
        this.playersInRange = [];
        this.localPlayer = new Player();
        this.invalidate = false;

        this.settings = settings;

        this.ignorePlayers = [];
        this.ignoreGuilds = [];
        this.ignoreAlliances = [];

        this.alreadyIgnoredPlayers = [];

        this.settings.ignoreList.forEach((element) => {
            const name = element['Name'];

            switch (element['Type']) {
                case 'Player':
                    this.ignorePlayers.push(name);
                    break;

                case 'Guild':
                    this.ignoreGuilds.push(name);
                    break;

                case 'Alliance':
                    this.ignoreAlliances.push(name);
                    break;
            
                default: // Default is player
                    this.ignorePlayers.push(name);
                    break;
            }
        });
    }

    getPlayersInRange() {
        try {
            return [...this.playersInRange]; // Create a copy of the array
        } finally {

        }
    }

    updateItems(id, Parameters) {

        let items = null;

        try {
            items = Parameters[2];
        }
        catch
        {
            items = null;
        }

        if (items != null) {
            this.playersInRange.forEach(playerOne => {
                if (playerOne.id === id) {
                    playerOne.items = items;
                }
            });
        }
    }

    handleNewPlayerEvent(Parameters, isBZ)
    {
        /*
        console.log()
        console.log("New Player")
        console.log(Parameters);
        */

        if (!this.settings.settingDot)
            return -1;

        /* General */
        const id = Parameters[0];
        const nickname = Parameters[1];

        if (this.alreadyIgnoredPlayers.find(name => name === nickname.toUpperCase()))
            return -1;

        if (this.ignorePlayers.find(name => name === nickname.toUpperCase()))
        {
            this.alreadyIgnoredPlayers.push(nickname.toUpperCase());
            return -1;
        }

        const guildName = String(Parameters[8]); 

        if (this.ignoreGuilds.find(name => name === guildName.toUpperCase()))
        {
            this.alreadyIgnoredPlayers.push(nickname.toUpperCase());
            return -1;
        }

        const alliance = String(Parameters[49]);

        if (this.ignoreAlliances.find(name => name === alliance.toUpperCase()))
        {
            this.alreadyIgnoredPlayers.push(nickname.toUpperCase());
            return -1;
        }

        /* Position */
        //var positionArray = Parameters[14];
        /*const posX = positionArray[0];
        const posY = positionArray[1];*/

       

        /* Health */
        const currentHealth = Parameters[22];
        const initialHealth = Parameters[23];

        /* Items & flag */
        const items = Parameters[40];
        const flagId = Parameters[53] | 0;

        if (isBZ)
        {
            if (!this.settings.settingDangerousPlayers) return -1;
        }
        else if ((flagId == 0 && !this.settings.settingPassivePlayers)
            || (flagId >= 1 && flagId <= 6 && !this.settings.settingFactionPlayers)
            || (flagId == 255 && !this.settings.settingDangerousPlayers)
        ) return -1;

        return this.addPlayer(0, 0, id, nickname, guildName, currentHealth, initialHealth, items, this.settings.settingSound, flagId);
    }

    handleMountedPlayerEvent(id, parameters)
    {
        let ten = parameters[10];
    
        let mounted = parameters[11];

        if (mounted == "true" || mounted == true)
        {
            this.updatePlayerMounted(id, true);
        } 
        else if (ten == "-1")
        {
            this.updatePlayerMounted(id, true);
        } 
        else
        {
            this.updatePlayerMounted(id, false);
        }
    }

    addPlayer(posX, posY, id, nickname, guildName, currentHealth, initialHealth, items, sound, flagId)
    {
        const existingPlayer = this.playersInRange.find(player => player.id === id);

        if (existingPlayer) return -1;

        const player = new Player(posX, posY, id, nickname, guildName, currentHealth, initialHealth, items, flagId);
        this.playersInRange.push(player);

        if (!sound) return 2;

        const audio = new Audio('/sounds/player.mp3');
        audio.play();

        return 2;
    }

    updateLocalPlayerNextPosition(posX, posY) {
        // TODO: Implement update local player next position
        throw new Error('Not implemented');
    }

    updatePlayerMounted(id, mounted)
    {
        for (const player of this.playersInRange) {
            if (player.id === id) {
                player.setMounted(mounted);
                break;
            }
        }
    }

    removePlayer(id)
    {
        this.playersInRange = this.playersInRange.filter(player => player.id !== id);
    }

    updateLocalPlayerPosition(posX, posY) {
        // Implement a local player lock mechanism
        this.localPlayer.posX = posX;
        this.localPlayer.posY = posY;
    }

    localPlayerPosX() {
        // Implement a local player lock mechanism
        return this.localPlayer.posX;
    }

    localPlayerPosY() {
        // Implement a local player lock mechanism
        return this.localPlayer.posY;
    }

    updatePlayerPosition(id, posX, posY, parameters) {
        const player = this.getPlayerById(id);
        if (!player) return;

        console.log("Updating player position", { id, parameters });
    
        const data = parameters[1]?.data;
        if (!data) return;
    
        const { xPos, yPos } = this.calculatePosition(data, parameters[4], parameters[5]);
    
        // Update player position
        player.posX = xPos;
        player.posY = yPos;
    
        console.log(`Player ${id} position updated: x=${xPos.toFixed(2)}, y=${yPos.toFixed(2)}`);
    }

    // Utility function to find a player by ID
    getPlayerById(id) {
        return this.playersInRange.find(player => player.id === id) || null;
    }
    
    // Utility function to calculate position
    calculatePosition(data, scaleX, scaleY) {
        const x = this.extractFloat(data, 9, 12);
        const y = this.extractFloat(data, 13, 16);
    
        const xPos = x * scaleX;
        const yPos = y * scaleY;
    
        return { xPos, yPos };
    }

    // Utility function to extract a float from byte array
    extractFloat(data, start, end) {
        const buffer = new ArrayBuffer(4);
        const f32 = new Float32Array(buffer);
        const ui8 = new Uint8Array(buffer);
    
        for (let i = start; i < end; i++) {
            ui8[i - start] = data[i];
        }
    
        return f32[0];
    }

    UpdatePlayerHealth(Parameters)
    {
        var uPlayer = this.playersInRange.find(player => player.id === Parameters[0]);

        if (!uPlayer) return;

        /*console.log();
        console.log("RegenerationHealthChanged");
        console.log(Parameters);*/

        uPlayer.currentHealth = Parameters[2];
        uPlayer.initialHealth = Parameters[3];
    }

    UpdatePlayerLooseHealth(Parameters)
    {
        var uPlayer = this.playersInRange.find(player => player.id === Parameters[0]);

        if (!uPlayer) return;

        uPlayer.currentHealth = Parameters[3];

        console.log();
        console.log("Health update");
        console.log(Parameters);
    }

    Clear()
    {
        this.playersInRange = [];
        this.alreadyIgnoredPlayers = [];
    }
}
