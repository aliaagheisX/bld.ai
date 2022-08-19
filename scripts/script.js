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


    const courseNode = createElementE("div", { "class": "course search-courses" });

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

const addCategory = (category) => {
    /* get title of category */
    const title = category.title.slice(15);

    /* add in nav bar */
    const categoryLinkContainer = createElementE('li');
    const categoryLinkNode = createElementE('input', {
        'name': 'cat',
        'class': 'radio-custom',
        'id': title,
        'value': title,
        'type': 'radio',
        'hidden': ''
    });
    const categoryLabelNode = createElementE('label', { 'for': title }, title);

    categoryLinkContainer.appendChild(categoryLinkNode);
    categoryLinkContainer.appendChild(categoryLabelNode);

    document.getElementById('category-nav').appendChild(categoryLinkContainer);

    /* add category page  */
    const categoryPageNode = createElementE('div', {
        'id': `courses-${title}`,
        'class': 'container course-content'
    });


    // 1- add  category details 
    categoryPageNode.appendChild(createElementE('h3', {}, category.header));
    categoryPageNode.appendChild(createElementE('p', {}, category.description));
    categoryPageNode.appendChild(createElementE('a', {
        'class': 'btn',
        'href': '/'
    }, `Explore ${title}`));

    // 2- add courses container
    const coursesContainerNode = createElementE('div', {
        'id': "courses-container",
        'class': "grid-container"
    });
    // 2.1- add all courses
    category.courses.forEach((course) => coursesContainerNode.appendChild(addCourse(course)));

    categoryPageNode.appendChild(coursesContainerNode);


    document.getElementById('category-container').appendChild(categoryPageNode);
}

/* for tap navbar */
const toggleCourses = (radio) => {
    /* radio already one selected */
    document.querySelectorAll('.course-content').forEach((course) => course.style.display = 'none');
    document.getElementById(`courses-${radio.id}`).style.display = 'flex';
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

/* call first after fetch data from api */
const inializer = (data) => {

    /*add all courses in  */
    for (category in data) {
        addCategory(data[category]);
    }

    //inial all cousres display none
    //make default category appear only
    document.querySelector(".radio-custom").checked = true;
    document.querySelector(".course-content").style.display = "flex";

    //add event click of checkboxes of nav bar
    //to toggle courses
    document.querySelectorAll('.radio-custom').forEach((e) => {
        e.addEventListener("click", () => toggleCourses(e));
    });

    //add events for searching
    document.getElementById("search").addEventListener("submit", search);
    document.getElementById("search-bar").addEventListener("keyup", search);
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
