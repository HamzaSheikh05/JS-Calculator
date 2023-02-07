const displayInput = document.querySelector("input[name='display']");
const buttons = document.querySelectorAll("input[type='button']");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.value === "AC") {
      displayInput.value = "";
    } else if (e.target.value === "DE") {
      displayInput.value = displayInput.value.slice(0, -1);
    } else if (e.target.value === "=") {
      displayInput.value = eval(displayInput.value);
    } else {
      displayInput.value += e.target.value;
    }
  });
});
