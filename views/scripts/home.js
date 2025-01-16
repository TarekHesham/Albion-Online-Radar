function returnLocalBool(item) {
  return localStorage.getItem(item) == "true";
}
// Testing
let settingDot = document.getElementById("settingDot");
let settingNickname = document.getElementById("settingNickname");
let settingHealth = document.getElementById("settingHealth");
let settingMounted = document.getElementById("settingMounted");

let settingItems = document.getElementById("settingItems");
let settingItemsDev = document.getElementById("settingItemsDev");

let settingDistance = document.getElementById("settingDistance");
let settingGuild = document.getElementById("settingGuild");

let settingSound = document.getElementById("settingSound");
let settingFlash = document.getElementById("settingFlash");

let settingPassivePlayers = document.getElementById("settingPassivePlayers");
let settingFactionPlayers = document.getElementById("settingFactionPlayers");
let settingDangerousPlayers = document.getElementById(
  "settingDangerousPlayers"
);

settingDot.checked = returnLocalBool("settingDot");
settingNickname.checked = returnLocalBool("settingNickname");
settingHealth.checked = returnLocalBool("settingHealth");
settingMounted.checked = returnLocalBool("settingMounted");

settingItems.checked = returnLocalBool("settingItems");
settingItemsDev.checked = returnLocalBool("settingItemsDev");

settingDistance.checked = returnLocalBool("settingDistance");
settingGuild.checked = returnLocalBool("settingGuild");

settingSound.checked = returnLocalBool("settingSound");
settingFlash.checked = returnLocalBool("settingFlash");

settingPassivePlayers.checked = returnLocalBool("settingPassivePlayers");
settingFactionPlayers.checked = returnLocalBool("settingFactionPlayers");
settingDangerousPlayers.checked = returnLocalBool("settingDangerousPlayers");

settingDot.addEventListener("click", () => {
  localStorage.setItem("settingDot", settingDot.checked);
});

settingNickname.addEventListener("click", () => {
  localStorage.setItem("settingNickname", settingNickname.checked);
});

settingHealth.addEventListener("click", () => {
  localStorage.setItem("settingHealth", settingHealth.checked);
});

settingMounted.addEventListener("click", () => {
  localStorage.setItem("settingMounted", settingMounted.checked);
});

settingItems.addEventListener("click", () => {
  localStorage.setItem("settingItems", settingItems.checked);
});

settingItemsDev.addEventListener("click", () => {
  localStorage.setItem("settingItemsDev", settingItemsDev.checked);
});

settingDistance.addEventListener("click", () => {
  localStorage.setItem("settingDistance", settingDistance.checked);
});
settingGuild.addEventListener("click", () => {
  localStorage.setItem("settingGuild", settingGuild.checked);
});

settingSound.addEventListener("click", () => {
  localStorage.setItem("settingSound", settingSound.checked);
});

settingFlash.addEventListener("click", () => {
  localStorage.setItem("settingFlash", settingFlash.checked);
});

settingPassivePlayers.addEventListener("click", () => {
  localStorage.setItem("settingPassivePlayers", settingPassivePlayers.checked);
});

settingFactionPlayers.addEventListener("click", () => {
  localStorage.setItem("settingFactionPlayers", settingFactionPlayers.checked);
});
settingDangerousPlayers.addEventListener("click", () => {
  localStorage.setItem(
    "settingDangerousPlayers",
    settingDangerousPlayers.checked
  );
});

function SetLanguage(lang) {
  document.getElementById("players-text").textContent = lang["pvp"]["players"];
  document.getElementById("show-text").textContent = lang["pvp"]["show"];

  document.getElementById("dot-text").textContent = lang["pvp"]["on-off"];

  document.getElementById("name-text").textContent = lang["pvp"]["nickname"];

  document.getElementById("name-tooltip").textContent =
    lang["pvp"]["nickname-tooltip"];

  document.getElementById("health-text").textContent = lang["pvp"]["health"];

  document.getElementById("health-tooltip").textContent =
    lang["pvp"]["health-tooltip"];

  document.getElementById("mounted-text").textContent = lang["pvp"]["mounted"];

  document.getElementById("mounted-tooltip").textContent =
    lang["pvp"]["mounted-tooltip"];

  document.getElementById("items-text").textContent = lang["pvp"]["items"];

  document.getElementById("items-tooltip").textContent =
    lang["pvp"]["items-tooltip"];
  document.getElementById("items-dev-text").textContent =
    lang["pvp"]["items-dev"];
  document.getElementById("items-dev-tooltip").textContent =
    lang["pvp"]["items-dev-tooltip"];

  document.getElementById("distance-text").textContent =
    lang["pvp"]["distance"];

  document.getElementById("distance-tooltip").textContent =
    lang["pvp"]["distance-tooltip"];

  document.getElementById("guild-text").textContent = lang["pvp"]["guild"];

  document.getElementById("guild-tooltip").textContent =
    lang["pvp"]["guild-tooltip"];

  document.getElementById("flash-text").textContent =
    lang["pvp"]["screenflash"];

  document.getElementById("flash-tooltip").textContent =
    lang["pvp"]["screenflash-tooltip"];

  document.getElementById("sound-text").textContent = lang["pvp"]["sound"];

  document.getElementById("sound-tooltip").textContent =
    lang["pvp"]["sound-tooltip"];

  document.getElementById("types-text").textContent = lang["pvp"]["types"];

  document.getElementById("passive-text").textContent = lang["pvp"]["passive"];

  document.getElementById("faction-text").textContent = lang["pvp"]["faction"];

  document.getElementById("dangerous-text").textContent =
    lang["pvp"]["dangerous"];

  document.getElementById("dangerous-tooltip").textContent =
    lang["pvp"]["dangerous-tooltip"];
}
