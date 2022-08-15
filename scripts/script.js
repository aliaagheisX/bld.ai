/* make innerHtml */
const addCourse = (course) => {
    /* 
        add course details in html context 
        @NOTE: people taken course and best seller are [randomized]
    */
    txt =
        `<div class="course">
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
    let title = category.title.slice(15);

    /* add in nav bar */
    document.getElementById('category-nav').innerHTML +=
        `
        <li>
        <input name="cat" class="radio-custom" id="${title}" type="radio"  value="${title}" hidden/>
        <label for="${title}"> ${title}</label></li>
    `

    /* prepare htmlContent to add in page  */
    element = document.getElementById("category-container")
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
    category.courses.forEach((course) => txt += addCourse(course));

    txt += `
        </div>
            <!-- courses container -->
        </div>
    `;

    document.getElementById('category-container').innerHTML += txt;

}


/* api to get all course */
async function getCourses() {
    try {
        let response = await fetch('http://localhost:3000/data');
        let data = await response.json();
        /* @test: add all courses in  */
        for (category in data) {
            addCategory(data[category]);
        }

        /*  */
        document.querySelectorAll('.radio-custom').forEach((e) => {
            e.onchange = () => {
                document.querySelectorAll('.course-content').forEach((e) => e.style.display = 'none');
                document.getElementById(`courses-${e.id}`).style.display = 'flex';
            }
        });
        /*  */

        document.querySelectorAll(".course-content").forEach((e) => e.style.display = "none");
        document.querySelector(".radio-custom").checked = true;
        document.querySelector(".course-content").style.display = "flex";
        //document.getElementById('courses-section');

    }
    catch (error) {
        console.log("error", error);
    }

}

getCourses();