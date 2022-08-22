import { updateAllButtons, updateButtons } from './utils.js';

/** responsible to bind element with their events at start of page */
export const startEvent = () => {

    //add events for searching

    /* to prevent submit action  */
    document.getElementById("search").addEventListener("submit", (e) => { e.preventDefault() });

    document.getElementById("search-bar").addEventListener("keyup", debounce());


    //add event for scroll
    document.querySelectorAll('.carousel button').forEach((element) => {
        element.addEventListener('click', () => scrollAnimation(element));
    });
}

/**
 * used in search
 * to delay for user input 
 * @returns 
 */
function debounce() {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => { search(); }, 250);
    };
}

/** 
 * called when the user use search bar
 * @param {event} e - to prevent input submit default
 */

const search = () => {

    /* get the searched value */
    const courseName = document.getElementById("search-bar").value;
    /* to make search insentinve */
    const regex = new RegExp(courseName.trim(), 'i');

    //loop through courses one by one
    document.querySelectorAll(".search-courses").forEach((element) => {
        const course = element.children[1]; //heading of div
        //if not found disappear
        if (course.textContent.search(regex) === -1) {
            element.style.display = "none";
        } else {
            element.style.display = "flex";
        }
    });


    updateAllButtons();
}

/**
 * scroll the carsoul row of the button
 * left | right
 * update useless [prev | next] buttons
 * @param {DOM element} element - the button clicked
 */
const scrollAnimation = (element) => {
    /* data getters */
    const target = element.getAttribute('data-bs-target');
    const behavior = element.getAttribute('data-bs-slide');

    /* element getters */
    const carousel = document.querySelector(`${target} .carousel`);
    const row = carousel.children[0];

    /* scroll calculation */
    const step = Math.max(row.offsetWidth - row.children[0].offsetWidth, row.children[0].offsetWidth);
    let left = row.scrollLeft;
    left += behavior == 'next' ? +step : -step;

    row.scroll({
        left: (left),
        behavior: 'smooth'
    });

    updateButtons(carousel, left);
}

