// Array to store password history
let passwordHistory = [];

// Function to generate random password
function generatePassword() {
  // Get password length
  const length = parseInt(document.getElementById("password-length").value);

  // Define character sets
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = lowercase.toUpperCase();
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]|\\:;'<>,.?/";

  // Build character pool based on user selections
  let charPool = "";
  if (document.getElementById("include-lowercase").checked) {
    charPool += lowercase;
  }
  if (document.getElementById("include-uppercase").checked) {
    charPool += uppercase;
  }
  if (document.getElementById("include-numbers").checked) {
    charPool += numbers;
  }
  if (document.getElementById("include-symbols").checked) {
    charPool += symbols;
  }

  // Check if any character sets are selected
  if (!charPool) {
    alert("Please select at least one character set!");
    return;
  }

  // Generate random password
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charPool.charAt(Math.floor(Math.random() * charPool.length));
  }

  // Display generated password and update background color
  document.getElementById("generated-password").textContent = password;
  document.body.style.backgroundColor = getRandomColor();
  document.getElementById("length-value").textContent = `${length} characters`;

  // Add password to history
  passwordHistory.push(password);
  updatePasswordHistory();
}

// Function to get a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to copy generated password to clipboard
function copyToClipboard() {
  const passwordField = document.getElementById("generated-password");
  const textArea = document.createElement("textarea");
  textArea.value = passwordField.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  document.body.removeChild(textArea);
  alert("Password copied to clipboard!");
}

// Function to update password history
function updatePasswordHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  passwordHistory.forEach((password, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `#${index + 1}: ${password}`;
    historyList.appendChild(listItem);
  });
}

// Function to clear password history
function clearPasswordHistory() {
  passwordHistory = [];
  updatePasswordHistory();
}

// Update length display on input change
document.getElementById("password-length").addEventListener("input", function() {
  document.getElementById("length-value").textContent = `${this.value} characters`;
});
