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

const createStars = (rating) => {

    const starsContainer = createElementE('div', { 'class': 'stars' });

    for (let i = 1; i <= 5; i++) {
        //make star element as full star is the default
        let star = createElementE('span', { 'class': 'material-symbols-outlined' }, 'star');

        if (Math.ceil(rating) < i)
            star.classList.add('empty_star');
        else if (rating < i)
            star.innerText = 'star_half';

        //add star to star container
        starsContainer.appendChild(star);
    }

    return starsContainer;
}
/* make innerHtml */
const addCourse = (courseData) => {
    /* 
        add course details in html context 
        @NOTE: people taken course and best seller are [randomized]
    */

    /* some edited course data */
    const courseRating = courseData.rating.toPrecision(2),
        coursePeopleAttend = Math.round(Math.random() * (100000 - 10000) + 10000),
        courseBestSeller = Math.random() >= 0.6;


    const courseNode = createElementE("div", { "class": "carousel-item  course search-courses" });

    const courseImageNode = createElementE("img", {
        "src": courseData.image,
        "alt": "course-image"
    });

    const courseLinkNode = createElementE('a', { "href": '/' }, courseData.title);
    const courseNameNode = createElementE('h4', { 'class': 'course-name' });
    courseNameNode.appendChild(courseLinkNode);

    const instructorNameNode = createElementE(
        'span',
        { 'class': 'utiltiy-comment instructor' },
        courseData.instructors[0].name
    );

    const courseRatingNode = createElementE('div', { 'class': 'rating-description' });
    const courseRatingInfoNode = createElementE('span', { 'class': 'rating' }, courseRating);
    const starsContainerNode = createStars(courseRating);
    const coursePeopleAttendNode = createElementE('span', { 'class': 'utiltiy-comment' }, coursePeopleAttend.toLocaleString());

    courseRatingNode.appendChild(courseRatingInfoNode);
    courseRatingNode.appendChild(starsContainerNode);
    courseRatingNode.appendChild(coursePeopleAttendNode);

    const coursePriceNode = createElementE('span', { 'class': 'price' }, `E£${courseData.price}`);

    courseNode.appendChild(courseImageNode);
    courseNode.appendChild(courseNameNode);
    courseNode.appendChild(instructorNameNode);
    courseNode.appendChild(courseRatingNode);
    courseNode.appendChild(coursePriceNode);

    return courseNode;
};

const addCategoryTab = (title, titleID) => {
    const categoryLinkNode = createElementE('button', {
        'class': 'nav-link',
        'id' : `nav-${titleID}-tab`,
        'data-bs-toggle': "tab",
        'data-bs-target': `#nav-${titleID}`,
        'aria-controls':`nav-${titleID}`,
        'type':"button",
        'role':"tab",
        'aria-selected':'false'
    }, title);
    
    
    document.querySelector('#category-nav .nav').appendChild(categoryLinkNode);
}

const btnIcon = (functionality, titleID) => {
    const btn = createElementE('button', {
        "class":`carousel-control-${functionality}`, 
        "type":"button", 
        "data-bs-target":`#courses-${titleID}`,
        'data-bs-slide': functionality
    });

    const circle = createElementE('span', {'class':'circle'});
    const icn = createElementE(
        'span', 
        {'class':'material-symbols-outlined'},
        functionality == 'prev' ? 'navigate_before' : 'navigate_next'
    );

    const accessibility = createElementE('span', {'class':'visually-hidden'}, functionality);

    circle.appendChild(icn);
    btn.appendChild(circle);
    btn.appendChild(accessibility);
    return btn;
}


const inializeCategory = (title, titleID, category) => {
    const tab = createElementE('div', {
        'class': "tab-pane show",
        'id': `nav-${titleID}`,
        'role': "tabpanel",
        'aria-labelledby': `nav-${titleID}-tab`,
        'tabindex': 0
    });
    
    const container = createElementE('div', {
        'class': "myContainer course-content",
        'id':  `courses-${titleID}`
    });
    
    const carousel = createElementE('div', {
        'class': 'carousel',
        'data-bs-ride': "carousel"
    });
    
    const row = createElementE('div', {
        'class': "carousel-inner row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5"
    });
    carousel.appendChild(row);
    carousel.appendChild(btnIcon('prev', titleID));
    carousel.appendChild(btnIcon('next', titleID));

    container.appendChild(createElementE('h3', {}, category.header));
    container.appendChild(createElementE('p', {}, category.description));
    container.appendChild(createElementE('a', {
        'class': 'btn',
        'href': '/'
    }, `Explore ${title}`));
    container.appendChild(carousel);


    tab.appendChild(container);
    
    document.querySelector('.category-tab').appendChild(tab);

    return row;
}

const addCategory = (category) => {

    /* get title of category */
    const title = category.title.slice(15);
    const titleID = title.replace(' ', '-');

    addCategoryTab(title, titleID);
    /* add category page  */

    // 2- add courses container
    const coursesRow = inializeCategory(title,titleID,category);
    
    category.courses.forEach((course) => {coursesRow.appendChild(addCourse(course)); });

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



/* const updateButtons = (carousel, row) => {
    let displayPrev = row.scrollLeft  == 0 ? 'none' : 'flex';
    let displayNext = row.scrollLeft  >= row.scrollWidth - row.clientWidth ? 'none' : 'flex';
    console.log(displayPrev, displayNext);
    carousel.children[1].style.display = displayPrev;
    carousel.children[2].style.display = displayNext;
} */

async function scrollAnimation (element) {
    /* data attributes */
    const target = element.getAttribute('data-bs-target');
    const behavior = element.getAttribute('data-bs-slide');
    
    /* element getters */
    const carousel = document.querySelector(`${target} .carousel`);
    const row = carousel.children[0];
    
    /* scroll calculation */
    const step = Math.max(row.offsetWidth - row.children[0].offsetWidth,row.children[0].offsetWidth);
    let left = row.scrollLeft;
    left += behavior == 'next' ? +step : -step;
    
    row.scroll({
        left: (left),
        behavior: 'smooth'
    }) 
    
}



/* call first after fetch data from api */
const inializer = (data) => {

    /*add all courses in  */
    for (category in data) {
        addCategory(data[category]);
    }
 
    //inial all cousres display none
    document.querySelector('#category-nav .nav-link').classList.add('active');
    document.querySelector('#category-nav .nav-link').setAttribute('aria-selected', 'true');
    document.querySelector('.tab-pane').classList.add('active');
    //add events for searching
    document.getElementById("search").addEventListener("submit", search);
    document.getElementById("search-bar").addEventListener("keyup", search);



   document.querySelectorAll('.carousel button').forEach((element)=> {
        element.addEventListener('click', () => scrollAnimation(element));
   });
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