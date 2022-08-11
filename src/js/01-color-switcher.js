// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEL = document.querySelector('body');

stopBtnEl.setAttribute('disabled', true);

let timerId = null;

startBtnEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEL.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnEl.setAttribute('disabled', true);
  stopBtnEl.removeAttribute('disabled', true);
});

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);
  startBtnEl.removeAttribute('disabled', true);
  stopBtnEl.setAttribute('disabled', true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
