var generateButton = document.querySelector("#generate");
var copyButton = document.querySelector("#copy");

generateButton.addEventListener("click", function() {
  var passwordLength = 0;
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("Enter password length between 8 and 128");
  }

  var [includeSpecialChars, includeUppercaseChars, includeLowercaseChars, includeDigits] = [false, false, false, false];
  while (!includeSpecialChars && !includeUppercaseChars && !includeLowercaseChars && !includeDigits) {
    includeSpecialChars = confirm("Include special characters?");
    includeUppercaseChars = confirm("Include UPPERCASE?");
    includeLowercaseChars = confirm("Include lowercase?");
    includeDigits = confirm("Include digits?");
  }

  var charSet = "";
  if (includeUppercaseChars) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercaseChars) charSet += "abcdefghijklmnopqrstuvwxyz";
  if (includeSpecialChars) charSet += "!#$%&'()*+,-./:;<=>?@{|}~";
  if (includeDigits) charSet += "0123456789";

  var password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = (Math.random() * 100) % charSet.length;
    password += charSet.charAt(randomIndex);
  }
  var textAreaElement = document.querySelector("#password");
  textAreaElement.textContent = password;
  copyButton.disabled = false;
});

copyButton.addEventListener("click", function() {
  var password = document.querySelector("#password");
  password.select();
  password.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Password copied:\n" + password.value);
});
