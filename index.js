// Function to validate date of birth
function validateDob(dobElement) {
  let dateArray = dobElement.value.split("-");
  let year = dateArray[0];
  let month = dateArray[1];
  let date = dateArray[2];
  let birthdate = new Date(year, month, date);
  let today = new Date();
  let currentYear = today.getFullYear();
  let birthYear = birthdate.getFullYear();
  let age = currentYear - birthYear;
  let monthDiff = today.getMonth() - birthdate.getMonth();

  if (today.getDate() < birthdate.getDate() || monthDiff < 0) {
    age--;
  }

  if (age < 18 || age > 55) {
    dobElement.setCustomValidity("Your age is not in between 18 and 55");
    dobElement.reportValidity();
  } else {
    dobElement.setCustomValidity("");
  }
}

// Event listener for date of birth input
const dobInput = document.getElementById("dob");
dobInput.addEventListener("change", () => validateDob(dobInput));

// Function to validate email
function validateEmail(emailElement) {
  if (emailElement.validity.typeMismatch) {
    emailElement.setCustomValidity("Invalid email");
    emailElement.reportValidity();
  } else {
    emailElement.setCustomValidity("");
  }
}

// Event listener for email input
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => validateEmail(emailInput));

// Function to retrieve entries from local storage
const retrieveEntries = () => {
  let entries = localStorage.getItem("entries");
  return entries ? JSON.parse(entries) : [];
};

// Array to store user entries
let userEntries = retrieveEntries();

// Function to display entries in the table
const displayEntries = () => {
  let entries = retrieveEntries();
  const tableEntries = entries.map((entry) => {
    const name = `<td>${entry.name}</td>`;
    const email = `<td>${entry.email}</td>`;
    const password = `<td>${entry.password}</td>`;
    const dob = `<td>${entry.dob}</td>`;
    const accept = `<td>${entry.acceptedTermsAndCondition}</td>`;
    return `<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
  }).join("\n");

  const table = `<table border="2">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Dob</th>
      <th>Accepted terms?</th>
    </tr>
    ${tableEntries}
  </table>`;

  let details = document.getElementById("entries");
  details.innerHTML = table;
};

// Function to save user form data
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndCondition = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndCondition,
  };

  userEntries.push(entry);
  localStorage.setItem("entries", JSON.stringify(userEntries));
  displayEntries();
};

// Event listener for user form submission
userform.addEventListener("submit", saveUserForm);

// Initial display of entries
displayEntries();
