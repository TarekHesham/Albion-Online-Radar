function returnLocalBool(item) {
  return localStorage.getItem(item) == "true";
}

let settingChestGreen = document.getElementById("settingChestGreen");
let settingChestBlue = document.getElementById("settingChestBlue");
let settingChestPurple = document.getElementById("settingChestPurple");
let settingChestYellow = document.getElementById("settingChestYellow");

settingChestGreen.checked = returnLocalBool("settingChestGreen");
settingChestBlue.checked = returnLocalBool("settingChestBlue");
settingChestPurple.checked = returnLocalBool("settingChestPurple");
settingChestYellow.checked = returnLocalBool("settingChestYellow");

settingChestGreen.addEventListener("click", () => {
  localStorage.setItem("settingChestGreen", settingChestGreen.checked);
});

settingChestBlue.addEventListener("click", () => {
  localStorage.setItem("settingChestBlue", settingChestBlue.checked);
});

settingChestPurple.addEventListener("click", () => {
  localStorage.setItem("settingChestPurple", settingChestPurple.checked);
});

settingChestYellow.addEventListener("click", () => {
  localStorage.setItem("settingChestYellow", settingChestYellow.checked);
});

let settingMistSolo = document.getElementById("settingMistSolo");
let settingMistDuo = document.getElementById("settingMistDuo");

let settingMistE0 = document.getElementById("settingMistE0");
let settingMistE1 = document.getElementById("settingMistE1");
let settingMistE2 = document.getElementById("settingMistE2");
let settingMistE3 = document.getElementById("settingMistE3");
let settingMistE4 = document.getElementById("settingMistE4");

let settingCage = document.getElementById("settingCage");
settingCage.checked = returnLocalBool("settingCage");
settingCage.addEventListener("click", () => {
  localStorage.setItem("settingCage", settingCage.checked);
});

settingMistSolo.checked = returnLocalBool("settingMistSolo");
settingMistDuo.checked = returnLocalBool("settingMistDuo");

settingMistE0.checked = returnLocalBool("settingMistE0");
settingMistE1.checked = returnLocalBool("settingMistE1");
settingMistE2.checked = returnLocalBool("settingMistE2");
settingMistE3.checked = returnLocalBool("settingMistE3");
settingMistE4.checked = returnLocalBool("settingMistE4");

settingMistSolo.addEventListener("click", () => {
  localStorage.setItem("settingMistSolo", settingMistSolo.checked);
});

settingMistDuo.addEventListener("click", () => {
  localStorage.setItem("settingMistDuo", settingMistDuo.checked);
});

settingMistE0.addEventListener("click", () => {
  localStorage.setItem("settingMistE0", settingMistE0.checked);
});

settingMistE1.addEventListener("click", () => {
  localStorage.setItem("settingMistE1", settingMistE1.checked);
});

settingMistE2.addEventListener("click", () => {
  localStorage.setItem("settingMistE2", settingMistE2.checked);
});

settingMistE3.addEventListener("click", () => {
  localStorage.setItem("settingMistE3", settingMistE3.checked);
});

settingMistE4.addEventListener("click", () => {
  localStorage.setItem("settingMistE4", settingMistE4.checked);
});

let settingDungeonSolo = document.getElementById("settingDungeonSolo");
let settingDungeonDuo = document.getElementById("settingDungeonDuo");

let settingDungeonE0 = document.getElementById("settingDungeonE0");
let settingDungeonE1 = document.getElementById("settingDungeonE1");
let settingDungeonE2 = document.getElementById("settingDungeonE2");
let settingDungeonE3 = document.getElementById("settingDungeonE3");
let settingDungeonE4 = document.getElementById("settingDungeonE4");

let settingDungeonCorrupted = document.getElementById(
  "settingDungeonCorrupted"
);
let settingDungeonHellgate = document.getElementById("settingDungeonHellgate");

settingDungeonSolo.checked = returnLocalBool("settingDungeonSolo");
settingDungeonDuo.checked = returnLocalBool("settingDungeonDuo");

settingDungeonE0.checked = returnLocalBool("settingDungeonE0");
settingDungeonE1.checked = returnLocalBool("settingDungeonE1");
settingDungeonE2.checked = returnLocalBool("settingDungeonE2");
settingDungeonE3.checked = returnLocalBool("settingDungeonE3");
settingDungeonE4.checked = returnLocalBool("settingDungeonE4");

settingDungeonCorrupted.checked = returnLocalBool("settingDungeonCorrupted");
settingDungeonHellgate.checked = returnLocalBool("settingDungeonHellgate");

settingDungeonSolo.addEventListener("click", () => {
  localStorage.setItem("settingDungeonSolo", settingDungeonSolo.checked);
});

settingDungeonDuo.addEventListener("click", () => {
  localStorage.setItem("settingDungeonDuo", settingDungeonDuo.checked);
});

settingDungeonE0.addEventListener("click", () => {
  localStorage.setItem("settingDungeonE0", settingDungeonE0.checked);
});

settingDungeonE1.addEventListener("click", () => {
  localStorage.setItem("settingDungeonE1", settingDungeonE1.checked);
});

settingDungeonE2.addEventListener("click", () => {
  localStorage.setItem("settingDungeonE2", settingDungeonE2.checked);
});

settingDungeonE3.addEventListener("click", () => {
  localStorage.setItem("settingDungeonE3", settingDungeonE3.checked);
});

settingDungeonE4.addEventListener("click", () => {
  localStorage.setItem("settingDungeonE4", settingDungeonE4.checked);
});

settingDungeonCorrupted.addEventListener("click", () => {
  localStorage.setItem(
    "settingDungeonCorrupted",
    settingDungeonCorrupted.checked
  );
});

settingDungeonHellgate.addEventListener("click", () => {
  localStorage.setItem(
    "settingDungeonHellgate",
    settingDungeonHellgate.checked
  );
});

function SetLanguage(lang) {
  document.getElementById("chests-text").textContent = lang["other"]["chests"];
  document.getElementById("chests-type-text").textContent =
    lang["other"]["type"];
  document.getElementById("green-text").textContent = lang["other"]["green"];
  document.getElementById("blue-text").textContent = lang["other"]["blue"];
  document.getElementById("purple-text").textContent = lang["other"]["purple"];
  document.getElementById("yellow-text").textContent = lang["other"]["yellow"];

  document.getElementById("mists-text").textContent = lang["other"]["mists"];
  document.getElementById("mists-type-text").textContent =
    lang["other"]["type"];
  document.getElementById("mists-solo-text").textContent =
    lang["other"]["solo"];
  document.getElementById("mists-duo-text").textContent = lang["other"]["duo"];
  document.getElementById("mists-enchant-text").textContent =
    lang["other"]["enchant"];
  document.getElementById("wisp-cages-text").textContent =
    lang["other"]["wisp-cages"];

  document.getElementById("dungeons-text").textContent =
    lang["other"]["dungeons"];
  document.getElementById("dungeons-type-text").textContent =
    lang["other"]["type"];
  document.getElementById("dungeons-solo-text").textContent =
    lang["other"]["solo"];
  document.getElementById("dungeons-group-text").textContent =
    lang["other"]["group"];
  document.getElementById("dungeons-enchant-text").textContent =
    lang["other"]["enchant"];

  document.getElementById("other-text").textContent = lang["other"]["other"];
  document.getElementById("corrupted-text").textContent =
    lang["other"]["corrupted"];
  document.getElementById("hellgate-text").textContent =
    lang["other"]["hellgate"];
}
