// Assignment Code
var generateBtn = document.querySelector("#generate");
// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.textContent = password;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
function generatePassword() {
    var passwordLength = Number(prompt("Password length required. Please enter a number between 8 and 128."))
}
