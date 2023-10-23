let selectedRow = null;

// Regular expressions for validation
const nameRegex = /^.{1,}$/; // Allows any characters, at least one
const ageRegex = /^(?:\d|[1-9]\d|99)$/; // Allows one or two digits
const desiredPositionRegex = /^.{1,20}$/; // Allows up to 20 characters
const phoneNumberRegex = /^\d{1,14}$/; // Allows up to 14 digits, starting with any digit
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation

// Show Alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
  setTimeout(() => document.querySelector(".alert").remove(), 4000);
}

function sendDataToServer(data) {
  return new Promise((resolve, reject) => {
    showAlert("Відправляємо дані на сервер...", "info");
    setTimeout(() => {
      console.log('Дані відправлено на сервер:', data);

      // Зберігаємо дані в LocalStorage перед викликом resolve
      saveDataToLocalStorage(data);

      // Після успішної відправки на сервер викликаємо callback-функцію resolve
      resolve(true);
    }, 4000);
  });
}

function getDataFromServer() {
  return new Promise((resolve, reject) => {
      showAlert("Отримуємо дані з сервера...", "info");
      setTimeout(() => {
          const simulatedData = [ /* Тут можна вставити імітовані дані з сервера, наприклад, масив об'єктів */ ];
          console.log('Дані отримано з сервера:', simulatedData);
          showAlert("Дані успішно отримано з сервера!", "success");
          resolve(simulatedData); // Повертаємо імітовані дані
      }, 4000); // Імітуємо затримку в 2 секунди
  });
}

// Clear all fields
function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#age").value = "";
  document.querySelector("#educationLevel").value = "";
  document.querySelector("#desiredPosition").value = "";
  document.querySelector("#phoneNumber").value = "";
  document.querySelector("#email").value = "";
}

// Save Data to LocalStorage
function saveDataToLocalStorage(data) {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  userData.push(data);
  localStorage.setItem("userData", JSON.stringify(userData));
}

// Load Data from LocalStorage
function loadDataFromLocalStorage() {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  const list = document.querySelector("#user-list");

  // Clear existing rows in the table
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  userData.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.firstName}</td>
      <td>${data.lastName}</td>
      <td>${data.age}</td>
      <td>${data.educationLevel}</td>
      <td>${data.desiredPosition}</td>
      <td>${data.phoneNumber}</td>
      <td>${data.email}</td>
      <td>
        
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      `;
    // <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
    list.appendChild(row);
  });
  function clearLocalStorageAfterPublish() {
    localStorage.removeItem("userData");
}
}

// Check Network Connection
function checkNetworkConnection() {
  return navigator.onLine;
}

// Function to update the page based on network status
function updatePageBasedOnNetworkStatus() {
  if (checkNetworkConnection()) {
    // If online, load data from LocalStorage and update the page
    showAlert(
      "Мережа доступна. Дані з LocalStorage додані на сторінку.",
      "success"
    );
    loadDataFromLocalStorage();
  } else {
    showAlert("Мережа відсутня. Дані будуть збережені в LocalStorage.", "info");
  }
}

// Add Data
document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();


  // Get Form Values
  const firstNameInput = document.querySelector("#firstName");
  const lastNameInput = document.querySelector("#lastName");
  const ageInput = document.querySelector("#age");
  const desiredPositionInput = document.querySelector("#desiredPosition");
  const phoneNumberInput = document.querySelector("#phoneNumber");
  const emailInput = document.querySelector("#email");

  // Get Form Values
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const age = ageInput.value;
  const educationLevel = document.querySelector("#educationLevel").value;
  const desiredPosition = desiredPositionInput.value;
  const phoneNumber = phoneNumberInput.value;
  const email = emailInput.value;

  // Reset error styles
  firstNameInput.classList.remove("is-invalid");
  lastNameInput.classList.remove("is-invalid");
  ageInput.classList.remove("is-invalid");
  desiredPositionInput.classList.remove("is-invalid");
  phoneNumberInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");

  // Validate
  let valid = true;
  if (!nameRegex.test(firstName)) {
    firstNameInput.classList.add("is-invalid");
    valid = false;
  }
  if (!nameRegex.test(lastName)) {
    lastNameInput.classList.add("is-invalid");
    valid = false;
  }
  if (!ageRegex.test(age)) {
    ageInput.classList.add("is-invalid");
    valid = false;
  }
  if (!desiredPositionRegex.test(desiredPosition)) {
    desiredPositionInput.classList.add("is-invalid");
    valid = false;
  }
  if (!phoneNumberRegex.test(phoneNumber)) {
    phoneNumberInput.classList.add("is-invalid");
    valid = false;
  }
  if (!emailRegex.test(email)) {
    emailInput.classList.add("is-invalid");
    valid = false;
  }

  if (!valid) {
    showAlert("Будь ласка, перевірте правильність заповнення полів", "danger");
  } else {
    const userData = {
      firstName,
      lastName,
      age,
      educationLevel,
      desiredPosition,
      phoneNumber,
      email,
    };

    if (checkNetworkConnection()) {
      sendDataToServer(userData)
        .then(() => {

          showAlert("Дані успішно відправлено на сервер!", "success");

          // Викликаємо функцію для отримання даних з сервера і оновлення сторінки
          getDataFromServer()
            .then((dataFromServer) => {
              showAlert("Дані успішно отримано з сервера!", "success");
              loadDataFromLocalStorage();
            })
            .catch(() => {
              showAlert("Виникла помилка при отриманні даних з сервера", "danger");
            });
        })
        .catch(() => {
          showAlert("Виникла помилка при відправці даних на сервер", "danger");
        });
    } else {
      saveDataToLocalStorage(userData);
      showAlert("Дані збережено в LocalStorage", "success");
      clearFields();
      selectedRow = null;
      updatePageBasedOnNetworkStatus();
    }
  }
});
// // Edit Data
// document.querySelector("#user-list").addEventListener("click", (e) => {
//   target = e.target;
//   if (target.classList.contains("edit")) {
//     selectedRow = target.parentElement.parentElement;
//     document.querySelector("#firstName").value =
//       selectedRow.children[0].textContent;
//     document.querySelector("#lastName").value =
//       selectedRow.children[1].textContent;
//     document.querySelector("#age").value = selectedRow.children[2].textContent;
//     document.querySelector("#educationLevel").value =
//       selectedRow.children[3].textContent;
//     document.querySelector("#desiredPosition").value =
//       selectedRow.children[4].textContent;
//     document.querySelector("#phoneNumber").value =
//       selectedRow.children[5].textContent;
//     document.querySelector("#email").value =
//       selectedRow.children[6].textContent;
//   }
// });

// Delete Data
document.querySelector("#user-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    const emailToDelete =
      target.parentElement.parentElement.children[6].textContent;
    const allData = JSON.parse(localStorage.getItem("userData")) || [];
    const updatedData = allData.filter((data) => data.email !== emailToDelete);
    localStorage.setItem("userData", JSON.stringify(updatedData));
    target.parentElement.parentElement.remove();
    showAlert("Дані видалено", "danger");
    selectedRow = null;
  }
});

// Load data from LocalStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updatePageBasedOnNetworkStatus();
});

// Add event listener for network status changes
window.addEventListener("online", () => {
  showAlert(
    "Мережа доступна. Дані з LocalStorage додані на сторінку.",
    "success"
  );
  // Load data from LocalStorage and update the page
  // loadDataFromLocalStorage();
  if (checkNetworkConnection()) {
    getDataFromServer().then(dataFromServer => {
        
        showAlert("Дані успішно отримано з сервера!", "success");
        loadDataFromLocalStorage();
    }).catch(() => {
        showAlert("Виникла помилка при отриманні даних з сервера", "danger");
    });
} else {
    loadDataFromLocalStorage();
}
});

// Add event listener for network status changes
window.addEventListener("offline", () => {
  showAlert("Мережа відсутня. Дані будуть збережені в LocalStorage.", "info");
});
