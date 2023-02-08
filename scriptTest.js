const displayInput = document.querySelector("input[name='display']");
const buttons = document.querySelectorAll("input[type='button']");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const decimalPoint = document.querySelector(".decimal");
let allowDecimal = true;
const errorMessage = "Error";

function main() {
  buttonPress();
  keyPress();
}

function buttonPress() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let val = e.target.value;
      if (val === "AC") {
        allowDecimal = true;
        return (displayInput.value = "");
      } else if (val === "DE") {
        checkDelete();
      } else if (val === "=") {
        displayInput.value = eval(displayInput.value);
        errorHandler();
      } else if (val === ".") {
        checkForDecimal();
      } else if (val == "+" || val == "-" || val == "*" || val == "/") {
        checkOperator(val);
      } else {
        if (displayInput.value === "Error") {
          return (displayInput.value = val);
        } else {
          document.getElementById("btnEq").disabled = false;
          return (displayInput.value += val);
        }
      }
    });
  });
}

const checkDelete = function () {
  if (displayInput.value[displayInput.value.length - 1] == ".") {
    allowDecimal = true;
  }
  displayInput.value = displayInput.value.slice(0, -1);
};

const checkOperator = function (val) {
  let lastVal = displayInput.value.slice(-1);
  if (lastVal == "+" || lastVal == "-" || lastVal == "*" || lastVal == "/") {
    return;
  } else {
    displayInput.value += val;
  }
};

function errorHandler() {
  if (
    displayInput.value === "Infinity" ||
    displayInput.value === "NaN" ||
    displayInput.value === "undefined" ||
    displayInput.value === "Error"
  ) {
    document.getElementById("btnEq").disabled = true;
    return (displayInput.value = errorMessage);
  }
}

function keyPress() {
  document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key >= "0" && key <= "9") {
      return (displayInput.value += key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      checkOperator(key);
    } else if (key === ".") {
      checkForDecimal();
    } else if (key === "=") {
      displayInput.value = eval(displayInput.value);
      errorHandler();
    } else if (key === "Delete" || key === "Backspace") {
      checkDelete();
    }
  });
}

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

main();
