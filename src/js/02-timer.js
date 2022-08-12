import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtnEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();

    if (currentDate < selectedDates[0]) {
      startBtnEl.removeAttribute('disabled', true);
      startBtnEl.addEventListener('click', onStartBtnElClick);

      let timerId = null;

      function onStartBtnElClick() {
        let currentDate = new Date();
        if (currentDate < selectedDates[0]) {
          startBtnEl.setAttribute('disabled', true);
          timerId = setInterval(() => {
            inputEl.setAttribute('disabled', true);

            const currentDate = new Date();
            let ms = selectedDates[0] - currentDate;

            if (Math.floor(ms / 1000) === 0) {
              clearInterval(timerId);
              inputEl.removeAttribute('disabled', true);
              Notify.success('The time has passed');
            }

            let values = convertMs(ms);

            // console.log(values);

            daysEl.textContent = addLeadingZero(values.days);
            hoursEl.textContent = addLeadingZero(values.hours);
            minutesEl.textContent = addLeadingZero(values.minutes);
            secondsEl.textContent = addLeadingZero(values.seconds);
          }, 1000);
        } else {
          Notify.warning(
            'Selected time has already passed, select one more time'
          );
        }
      }
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
