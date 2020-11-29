// Assignment Code
var generateBtn: HTMLElement = document.querySelector("#generate");
var submitBtn: HTMLElement = document.querySelector("#submit");
var cancelBtn: HTMLElement = document.querySelector("#cancel");
var lengthInput: HTMLInputElement = document.querySelector("#password-length");
var lowercaseInput: HTMLInputElement = document.querySelector("#lowercase");
var uppercaseInput: HTMLInputElement = document.querySelector("#uppercase");
var mixedcaseInput: HTMLInputElement = document.querySelector("#mixedcase");
var numericInput: HTMLInputElement = document.querySelector("#numeric");
var specialCharInput: HTMLInputElement = document.querySelector("#specialChar");

// Add event listener to generate button
generateBtn.addEventListener("click", showCriteriaForm);
cancelBtn.addEventListener("click", resetDefault);
submitBtn.addEventListener("click", writePassword);

// Form functions
function showCriteriaForm(): void {
  document.getElementById("password-view").style.display = "none";
  document.getElementById("criteriaForm").style.display = "block";
}

function hideCriteriaForm(): void {
  document.getElementById("criteriaForm").style.display = "none";
  document.getElementById("password-view").style.display = "block";
}

function resetDefault(): void {
  document.forms["myForm"].reset();
  hideCriteriaForm();
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password !== undefined) {
    var passwordText: HTMLElement = document.querySelector("#password");
    passwordText.textContent = password;
    resetDefault();
  }
}

var charBounds = [
  // [lowerBound, upperBound]
  [0],
  [97, 122], //lowercase
  [65, 90], //uppercase
  [48, 57], //numeric
  [32, 47, 58, 64, 91, 96, 123, 126], //special characters
];

function generatePassword(): string {
  // convert checkbox values to logical values
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
    1 * isLowerCase * isMixedCase, // returns 1 if lowercase or multicase is selected, else -1
    2 * isUpperCase * isMixedCase, // returns 2 if uppercase or multicase is selected, else -2
    3 * hasNumeric, //returns 3 if numeric is selected, else -3.
    4 * hasSpecialChar, //returns 4 if numeric is selected, else -4
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
        getRandomInt(
          charBounds[rCharBound][isSpecialChar],
          charBounds[rCharBound][isSpecialChar + 1]
        ) //random number between lower and upper bound that has been passed through
      );
  }

  return generatedPassword;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
