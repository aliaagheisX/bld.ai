import { createElementE } from './utils.js'
import { Course } from "./course.js";

/**
 * @constructor resposible to fetch all data from Category json object
 * create Category Tab [link - panel] dom element
 */

export class Category {
    constructor(categoryData) {
        this.title = categoryData.title.slice(15);
        this.titleID = this.title.replace(/ /g, '-');
        this.header = categoryData.header;
        this.description = categoryData.description;
        this.courses = categoryData.courses;
    }
    /**
     * create Category Tab [link - panel] dom element
     * load all of it's courses to carsoul
     */
    makeCategoryNode() {
        this.#addCategoryTabLink();

        const container = this.#getTabContainer();

        this.#addCategoryDetails(container);

        const coursesContainer = this.#makeCarsoul(container);

        this.#addCourses(coursesContainer);
    }

    #addCategoryTabLink() {
        const categoryLinkNode = createElementE('button', {
            'class': 'nav-link',
            'id': `nav-${this.titleID}-tab`,
            'data-bs-toggle': "tab",
            'data-bs-target': `#nav-${this.titleID}`,
            'aria-controls': `nav-${this.titleID}`,
            'type': "button",
            'role': "tab",
            'aria-selected': 'false'
        }, this.title);

        document.querySelector('#category-nav .nav').appendChild(categoryLinkNode);
    }

    #getTabContainer() {
        const tab = createElementE('div', {
            'class': "tab-pane show active",
            'id': `nav-${this.titleID}`,
            'role': "tabpanel",
            'aria-labelledby': `nav-${this.titleID}-tab`,
            'tabindex': 0
        });

        const container = createElementE('div', {
            'class': "myContainer course-content",
            'id': `courses-${this.titleID}`
        });

        tab.appendChild(container);
        document.querySelector('.category-tab').appendChild(tab);

        return container;
    }

    #addCategoryDetails(container) {
        container.appendChild(createElementE('h3', {}, this.header));
        container.appendChild(createElementE('p', {}, this.description));
        container.appendChild(createElementE('a', {
            'class': 'btn',
            'href': '/'
        }, `Explore ${this.title}`));
    }

    #makeCarsoulBtn(functionality) {
        const btn = createElementE('button', {
            "class": `carousel-control-${functionality}`,
            "type": "button",
            "data-bs-target": `#courses-${this.titleID}`,
            'data-bs-slide': functionality
        });

        const circle = createElementE('span', { 'class': 'circle' });
        const icn = createElementE(
            'span',
            { 'class': 'material-symbols-outlined' },
            functionality == 'prev' ? 'navigate_before' : 'navigate_next'
        );

        const accessibility = createElementE('span', { 'class': 'visually-hidden' }, functionality);

        circle.appendChild(icn);
        btn.appendChild(circle);
        btn.appendChild(accessibility);
        return btn;
    }

    #makeCarsoul(container) {
        const carousel = createElementE('div', {
            'class': 'carousel',
            'data-bs-ride': "carousel"
        });

        const coursesContainer = createElementE('div', {
            'class': "carousel-inner row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5"
        });

        carousel.appendChild(coursesContainer);
        carousel.appendChild(this.#makeCarsoulBtn('prev'));
        carousel.appendChild(this.#makeCarsoulBtn('next'));

        /* add it in container */
        container.appendChild(carousel);

        /* return where the courses should append */
        return coursesContainer;
    }

    #addCourses(container) {
        this.courses.forEach((courseData) => {
            const newCourse = new Course(courseData);
            container.appendChild(newCourse.getCourseNode());
        });
    }
}