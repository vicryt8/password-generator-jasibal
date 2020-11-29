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
    // [lowerBound, upperBound]
    [0],
    [97, 122],
    [65, 90],
    [48, 57],
    [32, 47, 58, 64, 91, 96, 123, 126],
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
    if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
        alert("Please insert a valid length for your password!");
        return undefined;
    }
    if (isLowerCase + isUpperCase * isMixedCase === -2) {
        alert("Please select a case for your password!");
        return undefined;
    }
    var filterCharBound = [
        //array with positions of charBounds indexes (1 = lowercase, 2 = uppercase, ...)
        // logic to make an array element less than 0 based off password generation parameters
        // (e.g. if lowercase is not selected, filterCharBound[0]=1*isLowerCase*isMixedCase --> filterCharBound[0]=1*-1*1 --> filterCharBound[0]=-1.
        1 * isLowerCase * isMixedCase,
        2 * isUpperCase * isMixedCase,
        3 * hasNumeric,
        4 * hasSpecialChar,
    ];
    filterCharBound = filterCharBound.filter(function (value, index, array) {
        // filters the previous array with positive numbers only, results in an array with charBound indexes of user allowed characters
        return value > 0;
    });
    var generatedPassword = "";
    for (var n = 0; n < passwordLength; n++) {
        //Generate the password string
        var rCharBound = getRandomInt(0, filterCharBound.length - 1); //random index of filtered array
        rCharBound = filterCharBound[rCharBound]; //returns the charBound index at random index of filtered array
        var isSpecialChar = rCharBound === 4 ? getRandomInt(0, 3) * 2 : 0;
        generatedPassword =
            generatedPassword + // adds characted to password string
                String.fromCharCode(
                //converts below number to ASCI character
                getRandomInt(charBounds[rCharBound][isSpecialChar], charBounds[rCharBound][isSpecialChar + 1]) //random number between lower and upper bound that has been passed through
                );
    }
    return generatedPassword;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
