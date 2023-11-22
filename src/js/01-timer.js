import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate >= selectedDates[0]) {
            btnStart.disabled = true;

            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });

        } else {
            btnStart.disabled = false;

            iziToast.success({
                title: 'OK',
                message: 'You can press "Start"!',
            });
        }
    },
};

flatpickr('#datetime-picker', options);


function convertMs(ms) {
    // Number of milliseconds per unit of time
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

/**
 * 
 * @param {number} value - число (наприклад 4)
 * @returns {string} - відформатоване значення під формат xx:xx:xx:xx, для додавання до HTML сторінки (наприклад 04)
 */
const addLeadingZero = value => value.toString().padStart(2, "0");

btnStart.addEventListener('click', startTimer);

function startTimer() {
    btnStart.disabled = true;
    input.disabled = true;

    // animatedDiv - данна змінна потрібна для стилізації
    const animatedDiv = document.querySelector('#animatedDiv');
    animatedDiv.classList.add('animated');

    const timer = setInterval(() => {
        const currentDate = new Date();
        const targetDate = new Date(input.value);
        const timeDiff = targetDate - currentDate;

        const { days, hours, minutes, seconds } = convertMs(timeDiff);

        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);

        const isTimerFinished = [days, hours, minutes, seconds].every(value => value === 0);

        if (isTimerFinished) {
            clearInterval(timer);
            input.disabled = false;

            animatedDiv.classList.remove('animated');
        }
    }, 1000);
}