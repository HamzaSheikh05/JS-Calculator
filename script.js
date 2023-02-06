let result = 0;
const message = "";
const greeting = "Welcome to JS Calculator";

//Operator Functions
function add(num_One, num_Two) {
  result = parseInt(num_One) + parseInt(num_Two);
  console.log(result);
  return result;
}

function subtract(num_One, num_Two) {
  result = parseInt(num_One) - parseInt(num_Two);
  console.log(result);
  return result;
}

function multiply(num_One, num_Two) {
  result = parseInt(num_One) * parseInt(num_Two);
  console.log(result);
  return result;
}

function divide(num_One, num_Two) {
  result = parseInt(num_One) / parseInt(num_Two);
  console.log(result);
  return result;
}

// Main Calculation Function;
function operate(operation, number_One, number_Two) {
  operation = prompt(`Enter the desired operation + , - , * , / `);
  number_One = prompt("Enter the first number");
  number_Two = prompt("Enter the second number");

  if (operation === "+") {
    return add(number_One, number_Two);
  } else if (operation === "-") {
    return subtract(number_One, number_Two);
  } else if (operation === "*") {
    return multiply(number_One, number_Two);
  } else if (operation === "/") {
    return divide(number_One, number_Two);
  } else {
    message = "Wrong Input";
    return console.log(message);
  }
}

console.log(greeting);
operate();
