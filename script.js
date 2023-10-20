
function handleFormSubmit(event) {
  event.preventDefault();//prevents a submit event from refreshing the web page.
  let form = event.target;
  let formValidated = validateName(form) && validateEmail(form) && validateCreditCardNumber(form);// if all 3 functions return true, then formValidated is true

  if (formValidated) {
    let button = document.getElementById("submitButton");
    button.innerText = "Sent";
    closeCardDetails(); // Call closeCardDetails only if the form is validated
  } else {
    highlightInvalidInputs(form);//highlights invalid fields
  }
}

function highlightInvalidInputs(form) {
  const nameInput = form.name;
  const emailInput = form.email;
  const cardInput = form.card;

  if (!validateName(form)) {
    nameInput.style.backgroundColor = "rgb(231,0,100)"; // Pink color if name is invalid
  } else {
    nameInput.style.backgroundColor = ""; // Reset background color
  }

  if (!validateEmail(form)) {
    emailInput.style.backgroundColor = "rgb(231,0,100)"; // Pink color if email is invalid
  } else {
    emailInput.style.backgroundColor = ""; // Reset background color
  }

  if (!validateCreditCardNumber(form)) {
    cardInput.style.backgroundColor = "rgb(231,0,100)"; // Pink color if card number is invalid
  } else {
    cardInput.style.backgroundColor = ""; // Reset background color
  }
}


function validateName(form) {
  let nameInput = form.name;
  let name = nameInput.value.trim();
  const validChars = /^[A-Za-z!#$%&'*+\-\/=?^_`{|}~\s]+$/;//validates upper and lower case letters and permitted characters

  if (!validChars.test(name)) {
    alert("Please enter your name as it appears on your credit card");
    nameInput.value = ''; // Clear the input if it's not valid
    return false;
  }

  const words = name.split(/\s+/);

  if (words.length < 2 || words.some(word => word.length < 2)) {
    alert("Must Contain your Full Name (Firstname, Surname, and any Middle Names.)");//condition to check for min 2 words, with min of 2 characters 
    nameInput.value = ''; // Clear the input if it's not valid
    return false;
  }

  return true;
}

function validateEmail(form) {
  const emailInput = form.email;
  const email = emailInput.value.trim();
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;//checks format of email address

  if (emailInput.type === "email" && emailPattern.test(email)) {
    return true; // condition to check if email is valid
  } else {
    alert("Please enter a valid email address.");
    emailInput.value = ''; // Clear the input if it's not valid
    return false;
  }
}

function validateCreditCardNumber(form) {
  const cardInput = form.card;
  const cardNumber = cardInput.value.replace(/\s/g, '');//removes spaces from card number

  if (cardNumber.length !== 16) {
    alert("Card number must be 16 digits");//condition to check if card number is 16 digits
    cardInput.value = ''; // Clear the input if it's not valid
    return false;
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    alert("Card number can only contain digits");//condition to check if card number contains only digits
    cardInput.value = ''; // Clear the input if it's not valid
    return false;
  }

  if (cardNumber === "0000000000000000") {
    alert("Card number cannot be all zeros");//condition to check if card number is all zeros
    cardInput.value = ''; // Clear the input if it's not valid
    return false;
  }

  if (!isLuhnValid(cardNumber)) {
    alert("Please enter a valid credit card number");//checks LUHN algorythm
    cardInput.value = ''; // Clear the input if it's not valid
    return false;
  }

  return true;
}

function isLuhnValid(cardNumber) {
  let sum = 0;
  let doubleUp = false;//doubles up every second digit from right to left

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }//checks if digit is greater than 9 and subtracts 9 if it is
    }
    sum += digit;
    doubleUp = !doubleUp;
  }//loops through card number and adds each digit to the sum

  return sum % 10 === 0;//checks if the sum is divisible by 10
}//if it is divisible by 10 credit card number is valid

function closeCardDetails() {
  document.getElementById("cardWrapper").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  // Show the "Thank You" message
  document.getElementById("thankYouMessage").style.display = "block";
}//hides card details and shows thank you message


// Submit button dark orange when mouse hovers over it.
function colourChange() {
    let submitButton = document.getElementById("submitButton");
    submitButton.style.backgroundColor = "darkorange";
}

// Original color when the mouse moves.
function colourOriginal() {
    let submitButton = document.getElementById("submitButton");
    submitButton.style.backgroundColor = "rgb(231, 0, 100)";
}

// Submit button dark orange when mouse hovers over it.
document.getElementById("submitButton").addEventListener("mouseenter", colourChange);

// Original color when the mouse moves.
document.getElementById("submitButton").addEventListener("mouseleave", colourOriginal);
