let countdown;
let isTimerRunning = false;
let currentDuration = 25 * 60; // 25 minutes in seconds
let currentSession = 'pomodoro';
let remainingTime = 0;
let startTime = 0;

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startTime = Date.now(); // Store the current timestamp when the timer starts
    countdown = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(countdown);
  isTimerRunning = false;
  remainingTime = currentDuration - Math.floor((Date.now() - startTime) / 1000); // Calculate the remaining time
}

function updateTimer() {
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  minutesElement.innerText = String(minutes).padStart(2, "0");
  secondsElement.innerText = String(seconds).padStart(2, "0");

  if (remainingTime > 0) {
    remainingTime--;
  } else {
    // Timer finished, switch to the next session
    if (remainingTime === 0 && isTimerRunning) {
      switchSession();
    }
  }
}

function switchSession() {
  if (currentSession === 'pomodoro') {
    currentDuration = 5 * 60; // Switch to short break (5 minutes)
    currentSession = 'shortBreak';
  } else if (currentSession === 'shortBreak') {
    currentDuration = 15 * 60; // Switch to long break (15 minutes)
    currentSession = 'longBreak';
  } else {
    currentDuration = 25 * 60; // Switch back to Pomodoro (25 minutes)
    currentSession = 'pomodoro';
  }
  updateCurrentSessionText();
}

function updateCurrentSessionText() {
  const currentSessionElement = document.querySelector(".current-session");
  if (currentSession === 'pomodoro') {
    currentSessionElement.innerText = 'Pomodoro';
  } else if (currentSession === 'shortBreak') {
    currentSessionElement.innerText = 'Short Break';
  } else {
    currentSessionElement.innerText = 'Long Break';
  }
}

function setSession(sessionType) {
  if (sessionType === 'pomodoro') {
    currentDuration = 25 * 60;
  } else if (sessionType === 'shortBreak') {
    currentDuration = 5 * 60;
  } else if (sessionType === 'longBreak') {
    currentDuration = 15 * 60;
  }
  currentSession = sessionType;
  remainingTime = currentDuration; // Reset remainingTime when session is changed
  updateTimer();
  updateCurrentSessionText();
}

function resetTimer() {
  clearInterval(countdown);
  isTimerRunning = false;
  currentSession = 'pomodoro';
  currentDuration = 25 * 60;
  remainingTime = 0; // Reset remainingTime when timer is reset
  updateTimer();
  updateCurrentSessionText();
}
setSession('pomodoro');