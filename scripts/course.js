import { createElementE } from './utils.js'
/**
 * @constructor resposible to fetch all data from course json object
 * create course dom element
 */
export class Course {
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
        const courseNode = createElementE("div", { "class": "course search-courses" });
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
            const star = createElementE('span', { 'class': 'material-symbols-outlined' }, 'star');

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
        if (this.isBestSeller) {
            return createElementE('span', { 'class': 'badge' }, 'Bestseller');
        }
        return createElementE('div');
    }
}
