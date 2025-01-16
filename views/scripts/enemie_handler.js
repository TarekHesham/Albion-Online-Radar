function returnLocalBool(item) {
  if (localStorage.getItem(item) == "true") {
    return true;
  } else {
    return false;
  }
}

//#region Classic enemies
const settingNormalEnemy = document.getElementById("settingNormalEnemy");
const settingMediumEnemy = document.getElementById("settingMediumEnemy");
const settingEnchantedEnemy = document.getElementById("settingEnchantedEnemy");
const settingMiniBossEnemy = document.getElementById("settingMiniBossEnemy");
const settingBossEnemy = document.getElementById("settingBossEnemy");

settingNormalEnemy.checked = returnLocalBool("settingNormalEnemy");
settingMediumEnemy.checked = returnLocalBool("settingMediumEnemy");
settingEnchantedEnemy.checked = returnLocalBool("settingEnchantedEnemy");
settingMiniBossEnemy.checked = returnLocalBool("settingMiniBossEnemy");
settingBossEnemy.checked = returnLocalBool("settingBossEnemy");

settingNormalEnemy.addEventListener("click", () => {
  localStorage.setItem("settingNormalEnemy", settingNormalEnemy.checked);
  HasToCheckCheckAllEnemies();
});
settingMediumEnemy.addEventListener("click", () => {
  localStorage.setItem("settingMediumEnemy", settingMediumEnemy.checked);
  HasToCheckCheckAllEnemies();
});
settingEnchantedEnemy.addEventListener("click", () => {
  localStorage.setItem("settingEnchantedEnemy", settingEnchantedEnemy.checked);
  HasToCheckCheckAllEnemies();
});
settingMiniBossEnemy.addEventListener("click", () => {
  localStorage.setItem("settingMiniBossEnemy", settingMiniBossEnemy.checked);
  HasToCheckCheckAllEnemies();
});
settingBossEnemy.addEventListener("click", () => {
  localStorage.setItem("settingBossEnemy", settingBossEnemy.checked);
  HasToCheckCheckAllEnemies();
});

const settingShowUnmanagedEnemies = document.getElementById(
  "settingShowUnmanagedEnemies"
);
settingShowUnmanagedEnemies.checked = returnLocalBool(
  "settingShowUnmanagedEnemies"
);
settingShowUnmanagedEnemies.addEventListener("click", () => {
  localStorage.setItem(
    "settingShowUnmanagedEnemies",
    settingShowUnmanagedEnemies.checked
  );
});

const settingShowMinimumHealthEnemies = document.getElementById(
  "settingShowMinimumHealthEnemies"
);
const settingTextMinimumHealthEnemies = document.getElementById(
  "settingTextMinimumHealthEnemies"
);

settingShowMinimumHealthEnemies.checked = returnLocalBool(
  "settingShowMinimumHealthEnemies"
);
settingTextMinimumHealthEnemies.value =
  localStorage.getItem("settingTextMinimumHealthEnemies") || "2100";

if (!settingShowMinimumHealthEnemies.checked)
  settingTextMinimumHealthEnemies.setAttribute("disabled", "");

settingShowMinimumHealthEnemies.addEventListener("click", () => {
  localStorage.setItem(
    "settingShowMinimumHealthEnemies",
    settingShowMinimumHealthEnemies.checked
  );

  if (settingShowMinimumHealthEnemies.checked) {
    settingTextMinimumHealthEnemies.removeAttribute("disabled");

    if (!settingShowUnmanagedEnemies.checked)
      settingShowUnmanagedEnemies.checked = true;
  } else settingTextMinimumHealthEnemies.setAttribute("disabled", "");
});

settingTextMinimumHealthEnemies.addEventListener("input", () => {
  localStorage.setItem(
    "settingTextMinimumHealthEnemies",
    settingTextMinimumHealthEnemies.value
  );
});

let updatingAllEnemies = false;
const settingAllEnemies = document.getElementById("settingAllEnemies");
settingAllEnemies.checked = returnLocalBool("settingAllEnemies");
settingAllEnemies.addEventListener("click", () => {
  updatingAllEnemies = true;

  localStorage.setItem("settingAllEnemies", settingAllEnemies.checked);

  if (settingNormalEnemy.checked != settingAllEnemies.checked)
    settingNormalEnemy.click(true);
  if (settingMediumEnemy.checked != settingAllEnemies.checked)
    settingMediumEnemy.click(true);
  if (settingEnchantedEnemy.checked != settingAllEnemies.checked)
    settingEnchantedEnemy.click(true);
  if (settingMiniBossEnemy.checked != settingAllEnemies.checked)
    settingMiniBossEnemy.click(true);
  if (settingBossEnemy.checked != settingAllEnemies.checked)
    settingBossEnemy.click(true);

  updatingAllEnemies = false;
});

function HasToCheckCheckAllEnemies() {
  if (updatingAllEnemies) return;

  let hasToCheck = false;

  if (
    (settingNormalEnemy.checked &&
      settingMediumEnemy.checked &&
      settingEnchantedEnemy.checked &&
      settingMiniBossEnemy.checked &&
      settingBossEnemy.checked &&
      !settingAllEnemies.checked) ||
    ((!settingNormalEnemy.checked ||
      !settingMediumEnemy.checked ||
      !settingEnchantedEnemy.checked ||
      !settingMiniBossEnemy.checked ||
      !settingBossEnemy.checked) &&
      settingAllEnemies.checked)
  )
    hasToCheck = true;

  if (!hasToCheck) return;

  settingAllEnemies.checked = !settingAllEnemies.checked;
  localStorage.setItem("settingAllEnemies", settingAllEnemies.checked);
}
//#endregion

//#region Other
const settingAvaloneDrones = document.getElementById("settingAvaloneDrones");
settingAvaloneDrones.checked = returnLocalBool("settingAvaloneDrones");
settingAvaloneDrones.addEventListener("click", () => {
  localStorage.setItem("settingAvaloneDrones", settingAvaloneDrones.checked);
});

const settingShowEventEnemies = document.getElementById(
  "settingShowEventEnemies"
);
settingShowEventEnemies.checked = returnLocalBool("settingShowEventEnemies");
settingShowEventEnemies.addEventListener("click", () => {
  localStorage.setItem(
    "settingShowEventEnemies",
    settingShowEventEnemies.checked
  );
});

//#endregion

//#region Mists
const settingBossCrystalSpider = document.getElementById(
  "settingBossCrystalSpider"
);
const settingBossFairyDragon = document.getElementById(
  "settingBossFairyDragon"
);
const settingBossVeilWeaver = document.getElementById("settingBossVeilWeaver");
const settingBossGriffin = document.getElementById("settingBossGriffin");

settingBossCrystalSpider.checked = returnLocalBool("settingBossCrystalSpider");
settingBossFairyDragon.checked = returnLocalBool("settingBossFairyDragon");
settingBossVeilWeaver.checked = returnLocalBool("settingBossVeilWeaver");
settingBossGriffin.checked = returnLocalBool("settingBossGriffin");

settingBossCrystalSpider.addEventListener("click", () => {
  localStorage.setItem(
    "settingBossCrystalSpider",
    settingBossCrystalSpider.checked
  );
});
settingBossFairyDragon.addEventListener("click", () => {
  localStorage.setItem(
    "settingBossFairyDragon",
    settingBossFairyDragon.checked
  );
});
settingBossVeilWeaver.addEventListener("click", () => {
  localStorage.setItem("settingBossVeilWeaver", settingBossVeilWeaver.checked);
});
settingBossGriffin.addEventListener("click", () => {
  localStorage.setItem("settingBossGriffin", settingBossGriffin.checked);
});
//#endregion

//#region Debug
const settingEnemiesHP = document.getElementById("settingEnemiesHP");
settingEnemiesHP.checked = returnLocalBool("settingEnemiesHP");
settingEnemiesHP.addEventListener("click", () => {
  localStorage.setItem("settingEnemiesHP", settingEnemiesHP.checked);
});

const settingEnemiesID = document.getElementById("settingEnemiesID");
settingEnemiesID.checked = returnLocalBool("settingEnemiesID");
settingEnemiesID.addEventListener("click", () => {
  localStorage.setItem("settingEnemiesID", settingEnemiesID.checked);
});
//#endregion

function SetLanguage(lang) {
  document.getElementById("enemies-text").textContent =
    lang["enemies"]["enemies"];
  document.getElementById("classic-enemies-text").textContent =
    lang["enemies"]["classic-enemies"];
  document.getElementById("all-text").textContent = lang["enemies"]["all"];
  document.getElementById("normal-text").textContent =
    lang["enemies"]["normal"];
  document.getElementById("medium-text").textContent =
    lang["enemies"]["medium"];
  document.getElementById("enchanted-text").textContent =
    lang["enemies"]["enchanted"];
  document.getElementById("mini-boss-text").textContent =
    lang["enemies"]["mini-boss"];
  document.getElementById("boss-text").textContent = lang["enemies"]["boss"];

  document.getElementById("show-minimum-text").textContent =
    lang["enemies"]["show-minimum"];
  document.getElementById("minimum-text").textContent =
    lang["enemies"]["minimum"];

  document.getElementById("other-text").textContent = lang["enemies"]["other"];
  document.getElementById("avalone-drones-text").textContent =
    lang["enemies"]["avalone-drones"];
  document.getElementById("event-text").textContent = lang["enemies"]["event"];

  document.getElementById("debug-text").textContent = lang["enemies"]["debug"];
  document.getElementById("health-text").textContent =
    lang["enemies"]["health"];
  document.getElementById("id-text").textContent = lang["enemies"]["id"];
}
