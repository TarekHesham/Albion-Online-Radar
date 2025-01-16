class Player {
    constructor(posX, posY, id, nickname, guildName, currentHealth, initialHealth, items, flagId) {
        this.posX = posX;
        this.posY = posY;
        this.oldPosX = posX;
        this.oldPosY = posY;
        this.id = id;
        this.nickname = nickname;
        this.guildName = guildName;
        this.currentHealth = currentHealth;
        this.initialHealth = initialHealth;
        this.items = items;
        this.flagId = flagId;
        this.mounted = false;
    }

    setMounted(mounted) {
        this.mounted = mounted;
    }
}

export class PlayersHandler {
    constructor(settings) {
        this.playersInRange = [];
        this.localPlayer = new Player(0, 0, 0, '', '', 100, 100, [], 0);
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
                default:
                    this.ignorePlayers.push(name);
            }
        });
    }

    getPlayersInRange() {
        return [...this.playersInRange];
    }

    addPlayer(posX, posY, id, nickname, guildName, currentHealth, initialHealth, items, sound, flagId) {
        if (this.playersInRange.find(player => player.id === id)) {
            return -1;
        }

        const newPlayer = new Player(posX, posY, id, nickname, guildName, currentHealth, initialHealth, items, flagId);
        this.playersInRange.push(newPlayer);

        if (sound) {
            const audio = new Audio('/sounds/player.mp3');
            audio.play();
        }

        return 2;
    }

    removePlayer(id) {
        this.playersInRange = this.playersInRange.filter(player => player.id !== id);
    }

    handleNewPlayerEvent(parameters, isBZ) {
        if (!this.settings.settingDot) {
            return -1;
        }

        const id = parameters[0];
        const nickname = parameters[1];

        if (this.alreadyIgnoredPlayers.includes(nickname.toUpperCase())) {
            return -1;
        }

        if (this.ignorePlayers.includes(nickname.toUpperCase())) {
            this.alreadyIgnoredPlayers.push(nickname.toUpperCase());
            return -1;
        }

        const guildName = String(parameters[8]);
        if (this.ignoreGuilds.includes(guildName.toUpperCase())) {
            this.alreadyIgnoredPlayers.push(nickname.toUpperCase());
            return -1;
        }

        const alliance = String(parameters[49]);
        if (this.ignoreAlliances.includes(alliance.toUpperCase())) {
            this.alreadyIgnoredPlayers.push(nickname.toUpperCase());
            return -1;
        }

        const currentHealth = parameters[22];
        const initialHealth = parameters[23];
        const items = parameters[40];
        const flagId = parameters[53] | 0;

        if (isBZ) {
            if (!this.settings.settingDangerousPlayers) return -1;
        } else if (
            (flagId === 0 && !this.settings.settingPassivePlayers) ||
            (flagId >= 1 && flagId <= 6 && !this.settings.settingFactionPlayers) ||
            (flagId === 255 && !this.settings.settingDangerousPlayers)
        ) {
            return -1;
        }

        return this.addPlayer(0, 0, id, nickname, guildName, currentHealth, initialHealth, items, this.settings.settingSound, flagId);
    }

    updateItems(id, parameters) {
        let items = null;

        try {
            items = parameters[2];
        } catch {
            items = null;
        }

        if (items) {
            this.playersInRange.forEach(player => {
                if (player.id === id) {
                    player.items = items;
                }
            });
        }
    }

    handleMountedPlayerEvent(id, parameters) {
        const mounted = parameters[11];

        if (mounted === "true" || mounted === true || parameters[10] === "-1") {
            this.updatePlayerMounted(id, true);
        } else {
            this.updatePlayerMounted(id, false);
        }
    }

    updatePlayerMounted(id, mounted) {
        const player = this.getPlayerById(id);
        if (player) {
            player.setMounted(mounted);
        }
    }

    updatePlayerHealth(parameters) {
        const player = this.playersInRange.find(player => player.id === parameters[0]);
        if (!player) return;

        player.currentHealth = parameters[2];
        // player.initialHealth = parameters[3];

        // console.log(`Player ${parameters[0]} health updated.\n${player.nickname} health: ${player.currentHealth}/${player.initialHealth}`);
    }

    updatePlayerLooseHealth(parameters) {
        const player = this.playersInRange.find(player => player.id === parameters[0]);
        if (!player) return;

        player.currentHealth = parameters[3];
        // console.log(`Player ${parameters[0]} lost health.`);
    }

    updateLocalPlayerPosition(posX, posY) {
        this.localPlayer.posX = posX;
        this.localPlayer.posY = posY;
    }

    getPlayerById(id) {
        return this.playersInRange.find(player => player.id === id) || null;
    }

    clear() {
        this.playersInRange = [];
        this.alreadyIgnoredPlayers = [];
    }
}
