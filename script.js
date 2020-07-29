// Elements
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const resetBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// Global Variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

// Time Variables
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum with todays date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown / complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    // Get the time between Jan 1, 1970 to the entered date, returned in milliseconds.
    const now = new Date().getTime();
    const distance = countdownValue - now;

    // Split up the time held in distance into days, hours, minutes, and seconds.
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Populate the countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;

    // Show Countdown
    countdownEl.hidden = false;
  }, second);
}

// Take Values from form input
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;

  // Check for valid date
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get the numbner version of current date and update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset all values
function reset() {
  // Hide Countdown and show input
  countdownEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);

  // Reset Values
  countdownTitle = '';
  countdownDate = '';
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
resetBtn.addEventListener('click', reset);
