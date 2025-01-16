// Set data to table
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const paginationContainer = document.getElementById("paginationContainer");

// Set data to modal when click edit button in table and has data-mob-id
const editModalId = document.getElementById("edit-modal-mob-id");
const editModalTier = document.getElementById("edit-modal-mob-tier");
const editModalType = document.getElementById("edit-modal-mob-type");
const editModalName = document.getElementById("edit-modal-mob-name");
const editModalSave = document.getElementById("edit-modal-save");

// Save data when click save button in modal
editModalSave.addEventListener("click", async (e) => {
  e.preventDefault();

  const mob = {
    id: parseInt(editModalId.value),
    tier: parseInt(editModalTier.value),
    type: editModalType.value,
    name: editModalName.value,
  };

  try {
    const response = await fetch("/api/edit-mob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mob }),
    });

    if (response.ok) {
      loadMobs();
      localStorage.setItem("mobUpdated", "true");
    }
  } catch (err) {
    console.error("Error saving mob:", err);
  }
});

// Handel add mob
const addMobBtn = document.getElementById("add-modal-save");
const addModalMobId = document.getElementById("add-modal-mob-id");
const addModalMobTier = document.getElementById("add-modal-mob-tier");
const addModalMobType = document.getElementById("add-modal-mob-type");
const addModalMobName = document.getElementById("add-modal-mob-name");
// Save data when click save button in modal
addMobBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const mob = {
    id: parseInt(addModalMobId.value),
    tier: parseInt(addModalMobTier.value),
    type: addModalMobType.value,
    name: addModalMobName.value,
  };

  try {
    const response = await fetch("/api/add-mob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mob }),
    });

    if (response.ok) {
      loadMobs();
      localStorage.setItem("mobUpdated", "true");

      // Blank the input fields
      addModalMobId.value = "";
      addModalMobName.value = "";

      // Reset the select element to the first option
      addModalMobTier.selectedIndex = 0;
      addModalMobType.selectedIndex = 0;
    }
  } catch (err) {
    console.error("Error saving mob:", err);
  }
});

// Set data to modal when click delete button in table and has data-mob-id
const deleteModalbutton = document.getElementById("delete-modal-btn");
// Delete data when click delete button in modal
deleteModalbutton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `/api/delete-mob/${deleteModalbutton.dataset.mobId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      loadMobs();
      localStorage.setItem("mobUpdated", "true");
    }
  } catch (err) {
    console.error("Error deleting mob:", err);
  }
});

const resourcesList = ["LivingSkinnable", "LivingHarvestable"]; // Define resources list
const resourcesWithoutTairList = ["Drone", "Events"]; // Define resources list

const itemsPerPage = 5; // Number of items per page
let currentPage = 1;
let filteredData = [];
// Function to render table rows
function renderTable(data, page = 1) {
  tableBody.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);

  for (const mob of pageData) {
    tableBody.innerHTML += `
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">${mob.id}</td>
        <td class="px-4 py-3">
          <img src="${
            resourcesList.includes(mob.type) ?
              `/images/Resources/${mob.name}_${mob.tier}_0.png` :
            resourcesWithoutTairList.includes(mob.type) ?
              `/images/Resources/${mob.name}.png` :
            `/images/Mobs/${mob.name}.png`
          }" class="w-16 h-16" alt="${mob.name}"/>
        </td>
        <td class="px-4 py-3 text-sm">${mob.type}</td>
        <td class="px-4 py-3 text-sm">${mob.tier}</td>
        <td class="px-4 py-6 flex gap-2">
          <button data-modal-target="edit-modal" data-modal-toggle="edit-modal" data-mob-id="${
            mob.id
          }" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Edit</button>
          <button data-modal-target="delete-modal" data-modal-toggle="delete-modal" data-mob-id="${
            mob.id
          }" class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button">Delete</button>
        </td>
      </tr>
    `;
  }

  // Initialize Flowbite
  if (window.Flowbite) {
    console.clear();
    window.initFlowbite();
  }

  // Set data to modal when click edit button in table and has data-mob-id and target edit-modal
  tableBody.addEventListener("click", async (e) => {
    // Check if the clicked element has the data-mob-id attribute and the target is edit-modal
    const buttonEdit = e.target.closest(
      "button[data-mob-id][data-modal-target='edit-modal']"
    );
    const buttonDelete = e.target.closest(
      "button[data-mob-id][data-modal-target='delete-modal']"
    );

    if (buttonEdit) {
      const mob = await pageData.find(
        (mob) => mob.id == buttonEdit.dataset.mobId
      );
      if (mob) {
        editModalId.value = mob.id;
        editModalName.value = mob.name;
        editModalType.value = mob.type;
        editModalTier.value = mob.tier;
      }
    } else if (buttonDelete) {
      const mob = await pageData.find(
        (mob) => mob.id == buttonDelete.dataset.mobId
      );
      if (mob) {
        deleteModalbutton.dataset.mobId = mob.id;
      }
    }
  });
}

// Function to render pagination controls
function renderPaginations(totalItems) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData.length);
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = `flex items-center justify-center px-3 h-8 ${
      i === currentPage
        ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;
    button.addEventListener("click", () => {
      currentPage = i;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData.length);
    });
    paginationContainer.appendChild(button);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData.length);
    }
  });
  paginationContainer.appendChild(nextButton);

  const totalMobs = document.getElementById("totalMobs");
  totalMobs.innerText = totalItems;
}

// Function to render pagination controls
function renderPagination(totalItems) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  prevButton.disabled = currentPage === 1; // Disable if on the first page
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData.length);
    }
  });
  paginationContainer.appendChild(prevButton);

  // Determine the range of pages to display
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Adjust range to always show 5 pages if possible
  if (endPage - startPage + 1 < 5) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 4);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 4);
    }
  }
  
  // Render page buttons
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = `flex items-center justify-center px-3 h-8 ${
      i === currentPage
        ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;
    button.addEventListener("click", () => {
      currentPage = i;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData.length);
    });
    paginationContainer.appendChild(button);
  }

  // Next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  nextButton.disabled = currentPage === totalPages; // Disable if on the last page
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData.length);
    }
  });
  paginationContainer.appendChild(nextButton);

  // Update total mobs count
  const totalMobs = document.getElementById("totalMobs");
  totalMobs.innerText = totalItems;
}


// Function to filter data based on search input
function filterData(data, query) {
  return data.filter(
    (mob) =>
      mob.name.toLowerCase().includes(query.toLowerCase()) ||
      mob.type.toLowerCase().includes(query.toLowerCase()) ||
      mob.tier.toString().includes(query) ||
      mob.id.toString().includes(query)
  );
}

// Main load function
async function loadMobs() {
  localStorage.removeItem("mobUpdated");

  const mobData = await fetch("/config/mobsInfo.json");
  const mobList = await mobData.json();
  filteredData = mobList; // Initialize filtered data with full list

  renderTable(filteredData, currentPage);
  renderPagination(filteredData.length);

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    filteredData = filterData(mobList, query);
    currentPage = 1; // Reset to first page
    renderTable(filteredData, currentPage);
    renderPagination(filteredData.length);
  });
}

loadMobs();

function SetLanguage() {}
