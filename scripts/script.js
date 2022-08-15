
/* make innerHtml */
const addCourse = (course) => {
    /* 
        add course details in html context 
        @NOTE: people taken course and best seller are [randomized]
    */
    txt =
        `<div class="course search-courses">
            <img src="${course.image}" alt="course-image">
            <h4 class="course-name"><a href="/">${course.title}</a></h4>
            <span class="utiltiy-comment instructor">${course.instructors[0].name}</span>
            <div class="rating-description">
                <span class="rating">${course.rating.toPrecision(2)}</span>
                <div class="stars">
                    <span class="material-symbols-outlined">star</span>
                    <span class="material-symbols-outlined">star</span>
                    <span class="material-symbols-outlined">star</span>
                    <span class="material-symbols-outlined">star</span>
                    <span class="material-symbols-outlined">star_half</span>
                </div>

                <span class="utiltiy-comment">

                ${Math.round(Math.random() * (100000 - 10000) + 10000).toLocaleString()}
                </span>
            </div>
            <span class="price">E£${course.price}</span>
            ${Math.random() >= 0.6 ? '<span class="badge">Bestseller</span>' : ''}
            
        </div>`;
    return txt;
};

const addCategory = (category) => {
    /* get title of category */
    let title = category.title.slice(15);

    /* add in nav bar */
    document.getElementById('category-nav').innerHTML +=
        `
        <li>
        <input name="cat" class="radio-custom" id="${title}" type="radio"  value="${title}" hidden/>
        <label for="${title}"> ${title}</label></li>
    `

    /* add category page  */

    /* 1- add htmltext of category details */
    txt = `
    <div id="courses-${title}" class="container course-content">
        <!-- second intro -->
        <h3>${category.header}</h3>
        <p>${category.description}</p>
        <a class="btn" href="/">Explore ${title}</a>
        <!-- second intro -->

        <!-- courses container -->
        <div id="courses-container" class="grid-container">
    `;

    /* 2- add all courses html text */
    category.courses.forEach((course) => txt += addCourse(course));

    /* 3- end html text */
    txt += `
        </div>
            <!-- courses container -->
        </div>
    `;

    /* added it */
    document.getElementById('category-container').innerHTML += txt;

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
        let response = await fetch('../data/courses.json');
        let data = await response.json()
        inializer(data.data);

    }
}
getCourses();
