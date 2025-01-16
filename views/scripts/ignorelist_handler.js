var isOpen = false;

let selectedType = "Player";

let drpMenu = document.getElementById("drpMenu");
let dropdownDefaultButton = document.getElementById("dropdownDefaultButton");
let dropdownDefaultText = document.getElementById("dropdownDefaultText");

dropdownDefaultButton.addEventListener(
  "blur",
  () => {
    if (isOpen) {
      setTimeout(() => {
        drpMenu.classList.toggle("hidden");
        isOpen = !isOpen;
      }, 100);
    }
  },
  true
);

dropdownDefaultButton.addEventListener("click", () => {
  isOpen = !isOpen;

  drpMenu.classList.toggle("hidden");
});

Array.from(drpMenu.children).forEach((element) => {
  element.addEventListener(
    "click",
    () => {
      dropdownDefaultText.textContent = element.textContent;
      selectedType = element.textContent;
    },
    false
  );
});

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  removeAll();
});

let storedData = JSON.parse(localStorage.getItem("ignoreList")) || [];

storedData.forEach((element) => {
  addItem(element);
});

function addItem(value) {
  const name = value["Name"];
  let type = value["Type"];
  if (!type) type = "Player";

  let tableBody = document.getElementById("tableBody");

  // Create a new table row element.
  let newRow = document.createElement("tr");
  newRow.className = "text-gray-700 dark:text-gray-400";

  // Set the HTML content of the new row with the desired structure.
  newRow.innerHTML = `
      <td class="px-4 py-3 text-sm">
        ${name}
      </td>
      <td class="px-4 py-3 text-sm">
        ${type}
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center space-x-4 text-sm">
          <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </td>
    `;

  // Append the new row to the table body.
  tableBody.appendChild(newRow);

  const button = newRow.children[2].children[0].children[0];
  button.addEventListener("click", function (event) {
    let idx = 0;

    for (let i = 0; i < tableBody.rows.length; i++) {
      if (tableBody.rows[i] == newRow) {
        idx = i;
        break;
      }
    }

    storedData.forEach((element) => {
      const paragraphContext = document.getElementById(
        element.id + "counterCell"
      );

      if (paragraphContext != null) {
        if (parseInt(paragraphContext.textContent) > idx + 1) {
          element.id = element.id - 1;
          paragraphContext.textContent = "" + element.id;
          paragraphContext.id = element.id + "counterCell";
        }
      }
    });

    storedData.splice(idx, 1);
    tableBody.removeChild(newRow);

    const updatedData = JSON.stringify(storedData);
    localStorage.setItem("ignoreList", updatedData);
  });
}

function removeAll() {
  localStorage.setItem("ignoreList", "[]");
  let tableBody = document.getElementById("tableBody");

  Array.from(tableBody.children).forEach((element) => {
    element.remove();
  });
}

const nameInput = document.getElementById("nameInput");
const button = document.getElementById("addItem");

button.addEventListener("click", function (event) {
  const nValue = { Name: nameInput.value.toUpperCase(), Type: selectedType };
  storedData.push(nValue);

  addItem(nValue);

  nameInput.value = "";

  const updatedData = JSON.stringify(storedData);
  localStorage.setItem("ignoreList", updatedData);
});
