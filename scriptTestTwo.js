let displayInput = document.querySelector("input[name='display']");
let buttons = document.querySelectorAll("input[type='button']");
let deleteBtn = document.querySelector(".delete");
let clearBtn = document.querySelector(".clear");
let decimalPoint = document.querySelector(".decimal");
let inputValue = "";
let allowDecimal = true;
const errorMessage = "Error";

const clear = function () {
  return (displayInput.value = "");
};

const deleteInput = function () {
  if (displayInput.value[displayInput.value.length - 1] == ".") {
    allowDecimal = true;
  }
  return (displayInput.value = displayInput.value.slice(0, -1));
};

const errorHandler = function () {
  if (
    displayInput.value === "Infinity" ||
    displayInput.value === "NaN" ||
    displayInput.value === "undefined" ||
    displayInput.value === "Error"
  ) {
    document.getElementById("btnEq").disabled = true;
    return (displayInput.value = errorMessage);
  }
};

const operate = function () {
  displayInput.value = eval(displayInput.value);
  errorHandler();
};

const checkForDecimal = function () {
  if (allowDecimal) {
    displayInput.value += ".";
    allowDecimal = false;
  } else {
    if (displayInput.value.includes(".")) {
      let lastOperatorIndex = Math.max(
        displayInput.value.lastIndexOf("+"),
        displayInput.value.lastIndexOf("-"),
        displayInput.value.lastIndexOf("*"),
        displayInput.value.lastIndexOf("/")
      );
      if (lastOperatorIndex > displayInput.value.lastIndexOf(".")) {
        allowDecimal = true;
      }
    } else return;
  }
};

const checkOperator = function () {
  let lastVal = displayInput.value.slice(-1);
  if (lastVal == "+" || lastVal == "-" || lastVal == "*" || lastVal == "/") {
    return;
  } else {
    displayInput.value += inputValue;
  }
};

const resetDisplay = function () {
  return (displayInput.value = "");
};

const main = function () {
  resetDisplay();
  buttonPress();
};

function buttonPress() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      inputValue = e.target.value;
      console.log(inputValue);

      if (inputValue === "AC") {
        clear();
      } else if (inputValue === "DE") {
        deleteInput();
      } else if (inputValue === "=") {
        operate();
      } else if (inputValue === ".") {
        checkForDecimal();
      } else if (
        inputValue == "+" ||
        inputValue == "-" ||
        inputValue == "*" ||
        inputValue == "/"
      ) {
        checkOperator(inputValue);
      } else {
        if (displayInput.value === "Error") {
          return (displayInput.value = inputValue);
        } else {
          document.getElementById("btnEq").disabled = false;
          return (displayInput.value += inputValue);
        }
      }
    });
  });
}

main();
