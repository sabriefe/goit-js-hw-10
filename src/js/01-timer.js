'use strict';

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
btn.disabled = true;
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addingZeros(item) {
  return String(item).padStart(2, "0");
}
let chosenDate = null;
let counterId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    chosenDate = selectedDates[0];

    if (! chosenDate || chosenDate < this.config.defaultDate) {
      iziToast.show({
        message: "Please choose a date in the future",
        position: 'topRight',
        backgroundColor: 'red',
        icon: "fa fa-times-circle",
        close: true
      });
      selectedDates = null;
      btn.disabled = true;
      return;
    }
    btn.disabled = false;
  },
};
let vain = 0;
  function countDown() {
    input.addEventListener('submit', () => {
      clearInterval(counterId);
    });
    counterId = setInterval(() => {
      const diff = chosenDate - Date.now();
      const item = convertMs(diff);
      days.textContent = addingZeros(item.days);
      hours.textContent = addingZeros(item.hours);
      minutes.textContent = addingZeros(item.minutes);
      seconds.textContent = addingZeros(item.seconds);
    }, 1000);
};
btn.addEventListener('click', () => {
  countDown();
  btn.disabled = true;
  input.disabled = true;
});
flatpickr(input, options);
