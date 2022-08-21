const createElementE = (tagName, attrList = {}, txt = "") => {
    //create element with same tag name
    const element = document.createElement(tagName);

    //set attributes
    for (let attrName in attrList) {
        element.setAttribute(attrName, attrList[attrName]);
    }

    //add text to element
    element.innerText += txt;

    return element;
}

class Course {
    constructor(courseData) {
        this.rating = courseData.rating.toPrecision(2);
        this.peopleAttend = Math.round(Math.random() * (100000 - 10000) + 10000);
        this.isBestSeller = Math.random() >= 0.6;
        this.image = courseData.image;
        this.title = courseData.title;
        this.titleID = courseData.title.replace(/ /g, '-');
        this.instructors = courseData.instructors;
        this.price = courseData.price;
    }

    getCourseNode() {
        const courseNode = createElementE("div", { "class": "carousel-item  course search-courses" });
        courseNode.appendChild(this.#getImageNode());
        courseNode.appendChild(this.#getTitleNode());
        courseNode.appendChild(this.#getInstructorsNode());
        courseNode.appendChild(this.#getRatingNode());
        courseNode.appendChild(this.#getPriceNode());
        courseNode.appendChild(this.#getBestSeller());
        return courseNode;
    }

    /* private method to get Nodes */
    #getImageNode() {
        return createElementE("img", {
            "src": this.image,
            "alt": "course-image"
        });
    }

    #getTitleNode() {
        const courseLinkNode = createElementE(
            'a',
            { "href": `https://www.udemy.com/course/${this.titleID}` },
            this.title
        );
        const courseNameNode = createElementE('h4', { 'class': 'course-name' });
        courseNameNode.appendChild(courseLinkNode);


        return courseNameNode;
    }

    #getInstructorsNode() {
        return createElementE(
            'span',
            { 'class': 'utiltiy-comment instructor' },
            this.instructors[0].name
        );
    }

    #getStarsNode() {

        const starsContainer = createElementE('div', { 'class': 'stars' });

        for (let i = 1; i <= 5; i++) {
            //make star element as full star is the default
            let star = createElementE('span', { 'class': 'material-symbols-outlined' }, 'star');

            if (Math.ceil(this.rating) < i)
                star.classList.add('empty_star');
            else if (this.rating < i)
                star.innerText = 'star_half';

            //add star to star container
            starsContainer.appendChild(star);
        }

        return starsContainer;

    }

    #getRatingNode() {
        const courseRatingNode = createElementE('div', { 'class': 'rating-description' });
        const courseRatingInfoNode = createElementE('span', { 'class': 'rating' }, this.rating);
        const starsContainerNode = this.#getStarsNode();
        const coursePeopleAttendNode = createElementE('span', { 'class': 'utiltiy-comment' }, this.peopleAttend.toLocaleString());

        courseRatingNode.appendChild(courseRatingInfoNode);
        courseRatingNode.appendChild(starsContainerNode);
        courseRatingNode.appendChild(coursePeopleAttendNode);

        return courseRatingNode;
    }

    #getPriceNode() {
        return createElementE('span', { 'class': 'price' }, `E£${this.price}`);
    }
    
    #getBestSeller() {
        if(this.isBestSeller) {
            return createElementE('span', {'class':'badge'},  'Bestseller');
        }
        return createElementE('div');
    }
}

class Category {
    constructor(categoryData) {
        this.title = categoryData.title.slice(15);
        this.titleID = this.title.replace(/ /g, '-');
        this.header = categoryData.header;
        this.description = categoryData.description;
        this.courses = categoryData.courses;
    }

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
            'class': "tab-pane show",
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
            let newCourse = new Course(courseData);
            container.appendChild(newCourse.getCourseNode());
        });
    }
}


/* for searching */
const search = (e) => {
    /* to prevent submit action  */
    e.preventDefault();

    /* get the searched value */
    const courseName = document.getElementById("search-bar").value;
    /* to make search insentinve */
    const regex = new RegExp(courseName, 'i');

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

}



/* for carsoul animation */
const updateButtons = (carousel, row, left) => {
    let displayPrev = left <= 0 ? 'none' : 'flex';
    let displayNext = left >= row.scrollWidth - row.clientWidth ? 'none' : 'flex';

    carousel.children[1].style.display = displayPrev;
    carousel.children[2].style.display = displayNext;
}

function scrollAnimation(element) {
    /* data attributes */
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

    updateButtons(carousel, row, left);

}



/* call first after fetch data from api */
const inializer = (data) => {

    /*add all categroies to html dom  */
    for (categoryData in data) {
        const cat = new Category(data[categoryData]);
        cat.makeCategoryNode();
    }

    //activate first tab link
    const firstTabLink = document.querySelector('#category-nav .nav-link');
    firstTabLink.classList.add('active');
    firstTabLink.setAttribute('aria-selected', 'true');

    //activate first tab
    document.querySelector('.tab-pane').classList.add('active');


    //add events for searching
    document.getElementById("search").addEventListener("submit", search);
    document.getElementById("search-bar").addEventListener("keyup", search);


    //add event for scroll
    document.querySelectorAll('.carousel button').forEach((element) => {
        element.addEventListener('click', () => scrollAnimation(element));
    });

    /* remove all previos buttons */
    document.querySelectorAll('.carousel-control-prev').forEach((e) => {
        e.style.display = 'none';
    })
}

/* api to get all course */
async function getCourses() {
    try {
        /* try json server */
        let response = await fetch('http://localhost:3000/data');
        let data = await response.json();
        inializer(data);

    } catch (error) {
        /* if there no json server load from file  */
        let response = await fetch('data/courses.json');
        let data = await response.json()
        inializer(data.data);

    }
}

getCourses();