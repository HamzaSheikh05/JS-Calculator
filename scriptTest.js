const displayInput = document.querySelector("input[name='display']");
const buttons = document.querySelectorAll("input[type='button']");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const decimalPoint = document.querySelector(".decimal");
let allowDecimal = true;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let val = e.target.value;
    if (val === "AC") {
      displayInput.value = "";
      allowDecimal = true;
    } else if (val === "DE") {
      displayInput.value = displayInput.value.slice(0, -1);
      allowDecimal = true;
    } else if (val === "=") {
      displayInput.value = eval(displayInput.value);
    } else if (val === ".") {
      checkForDecimal();
    } else {
      displayInput.value += val;
    }
  });
});

document.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key >= "0" && key <= "9") {
    displayInput.value += key;
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    displayInput.value += key;
  } else if (key === ".") {
    checkForDecimal();
  } else if (key === "Enter" || key === "=") {
    displayInput.value = eval(displayInput.value);
  } else if (key === "Delete" || key === "Backspace") {
    displayInput.value = displayInput.value.slice(0, -1);
  }
});

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
