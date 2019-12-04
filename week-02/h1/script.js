var passwordLength = 0;
while (passwordLength < 8 || passwordLength > 128) {
  passwordLength = prompt("Enter password length between 8 and 128");
}

var includeSpecialChars = confirm("Include special characters?");
var includeUppercase = confirm("Include uppercase?");
var includeLowercase = confirm("Include lowercase?");
var includeDigits = confirm("Include digits?");

var charSet = "";
if (includeUppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if (includeLowercase) charSet += "abcdefghijklmnopqrstuvwxyz";
if (includeSpecialChars) charSet += "!#$%&'()*+,-./:;<=>?@{|}~";
if (includeDigits) charSet += "0123456789";

var password = "";
for (let i = 0; i < passwordLength; i++) {
  const random = (Math.random() * 100) % charSet.length;
  password += charSet.charAt(random);
}

var textArea = document.querySelector("#password");
textArea.textContent = password;
