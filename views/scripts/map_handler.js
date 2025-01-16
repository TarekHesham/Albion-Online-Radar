function returnLocalBool(item) {
  return localStorage.getItem(item) == "true";
}

let settingShowMap = document.getElementById("settingShowMap");

settingShowMap.checked = returnLocalBool("settingShowMap");

settingShowMap.addEventListener("click", () => {
  localStorage.setItem("settingShowMap", settingShowMap.checked);
});

function SetLanguage(lang) {
  document.getElementById("map-text").textContent = lang["map"]["map"];
  document.getElementById("map-bg-text").textContent = lang["map"]["map-bg"];
}
