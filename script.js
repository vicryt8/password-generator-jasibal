// Assignment Code
var generateBtn = document.querySelector("#generate");
var submitBtn = document.querySelector("#submit");
var cancelBtn = document.querySelector("#cancel");
var lengthInput = document.querySelector("#password-length");
var lowercaseInput = document.querySelector("#lowercase");
var uppercaseInput = document.querySelector("#uppercase");
var mixedcaseInput = document.querySelector("#mixedcase");
var numericInput = document.querySelector("#numeric");
var specialCharInput = document.querySelector("#specialChar");
// Add event listener to generate button
generateBtn.addEventListener("click", showCriteriaForm);
cancelBtn.addEventListener("click", resetDefault);
submitBtn.addEventListener("click", writePassword);
// Form functions
function showCriteriaForm() {
    document.getElementById("password-view").style.display = "none";
    document.getElementById("criteriaForm").style.display = "block";
}
function hideCriteriaForm() {
    document.getElementById("criteriaForm").style.display = "none";
    document.getElementById("password-view").style.display = "block";
}
function resetDefault() {
    document.forms["myForm"].reset();
    hideCriteriaForm();
}
// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    if (password !== undefined) {
        var passwordText = document.querySelector("#password");
        passwordText.textContent = password;
        resetDefault();
    }
}
var charBounds = [
    [0],
    [97, 122],
    [65, 90],
    [48, 57],
    [32, 47],
    [58, 64],
    [91, 96],
    [123, 126],
];
function generatePassword() {
    var passwordLength = Number(lengthInput.value);
    var isLowerCase = lowercaseInput.checked ? 1 : -1;
    var isUpperCase = uppercaseInput.checked ? 1 : -1;
    var isMixedCase = mixedcaseInput.checked ? -1 : 1;
    var hasNumeric = numericInput.checked ? 1 : -1;
    var hasSpecialChar = specialCharInput.checked ? 1 : -1;
    /* validate user input */
    console.log(passwordLength);
    if (passwordLength === NaN || passwordLength < 8 || passwordLength > 128) {
        alert("Please insert a valid length for your password!");
        return undefined;
    }
    if (isLowerCase + isUpperCase * isMixedCase === -2) {
        alert("Please select a case for your password!");
        return undefined;
    }
    var filterCharBound = [
        1 * isLowerCase * isMixedCase,
        2 * isUpperCase * isMixedCase,
        3 * hasNumeric,
        4 * hasSpecialChar,
        5 * hasSpecialChar,
        6 * hasSpecialChar,
        7 * hasSpecialChar,
    ];
    filterCharBound = filterCharBound.filter(function (value, index, array) {
        return value > 0;
    });
    var generatedPassword = "";
    for (var n = 0; n < passwordLength; n++) {
        var rCharBound = getRandomInt(0, filterCharBound.length - 1);
        rCharBound = filterCharBound[rCharBound];
        generatedPassword =
            generatedPassword +
                String.fromCharCode(getRandomInt(charBounds[rCharBound][0], charBounds[rCharBound][1]));
    }
    console.log("random password: " + generatedPassword);
    return generatedPassword;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
