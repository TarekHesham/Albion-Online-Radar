class MobsInfo {
    constructor() {
        this.moblist = {};
    }

    addItem(id, tier, type, name) {
        if (!this.moblist[id]) {
            this.moblist[id] = [];
        }

        this.moblist[id][0] = tier;
        this.moblist[id][1] = type;
        this.moblist[id][2] = name;
    }

    async loadMobsFromJSON(filePath) {
        const response = await fetch(filePath);
        const data = await response.json();
        
        data.forEach(mob => {
            const type = EnemyType[mob.type];
            this.addItem(mob.id, mob.tier, type, mob.name);
        });
    }
}