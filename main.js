const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minInput");
const secondsInput = document.getElementById("secInput");

const startBtn = document.getElementById("startBtn");
const start = document.querySelector("#startBtn span");
const startBtnImg = document.getElementById("startBtnImg");
const resetBtn = document.getElementById("resetBtn");
const resetBtnImg = document.getElementById("resetBtnImg");

function updateStartBtnColor() {
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  if (hours !== 0 || minutes !== 0 || seconds !== 0) {
    startBtn.style.backgroundColor = "#5180FF";
    startBtn.style.color = "#fff";
    startBtnImg.src = "image/icon-start.png";

    resetBtn.style.backgroundColor = "#FB7099";
    resetBtn.style.color = "#fff";
    resetBtnImg.src = "image/icon-reset.png";
  } else {
    startBtn.style.backgroundColor = "";
    startBtn.style.color = "";
    startBtnImg.src = "image/icon-start-disabled.svg";

    resetBtn.style.backgroundColor = "";
    resetBtn.style.color = "";
    resetBtnImg.src = "image/icon-reset-disabled.png";
  }
}

hoursInput.addEventListener("input", updateStartBtnColor);
minutesInput.addEventListener("input", updateStartBtnColor);
secondsInput.addEventListener("input", updateStartBtnColor);

let timerInterval = null;

startBtn.addEventListener("click", () => {
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  if (hours === "" && minutes === "" && seconds === "") {
    return;
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return;
  }

  if (seconds >= 60) {
    const total = parseInt(seconds / 60);
    seconds = seconds % 60;
    minutes += total;
  }

  if (minutes >= 60) {
    const total = parseInt(minutes / 60);
    minutes = minutes % 60;
    hours += total;
  }

  hoursInput.value = hours;
  minutesInput.value = minutes;
  secondsInput.value = seconds;

  start.textContent = "PAUSE";
  startBtnImg.src = "image/icon-stop.png";
  startBtn.style.backgroundColor = "#15C2B8";

  timerInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      clearInterval(timerInterval);
      timerInterval = null;

      start.textContent = "START";
      startBtnImg.src = "image/icon-start-disabled.svg";
      startBtn.style.backgroundColor = "";
      startBtn.style.color = "";

      resetBtnImg.src = "image/icon-reset-disabled.svg";
      resetBtn.style.backgroundColor = "";
      resetBtn.style.color = "";
      return;
    }

    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = seconds;
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;

  start.textContent = "START";
  startBtnImg.src = "image/icon-start.png";
  start.style.backgroundColor = "";
});
