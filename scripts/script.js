import { DomStart } from './utils.js';
import { Category } from "./category.js";
import { startEvent } from "./events.js";

/**
 *  call first after fetch data from api
 *  @param {object} data - courses of categories object from json-server
 *  1- inialize all categrories
 *  2- start dom inializations
 *  3- start event inializations
 */
const inializer = (data) => {

    /*add all categroies to html dom  */
    for (let categoryData in data) {
        const cat = new Category(data[categoryData]);
        cat.makeCategoryNode();
    }

    DomStart();

    startEvent();
}


/**
 * @returns {data} - fetched from json server || json file
 */

async function fetchApi() {
    try {
        const response = await fetch('http://localhost:3000/data');

        return await response.json();

    } catch (error) {
        const response = await fetch('data/courses.json');

        return (await response.json()).data;
    }
}

fetchApi()
    .then((d) => inializer(d));