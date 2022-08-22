

/** 
 * use to create dom elements, set attribute and set inner Text easily 
 * @param {string} tagName - tag title : div,span,.. etc
 * @param {dictionary} tagName - tag title : div,span,.. etc
 */
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
    console.log(typeof attrList);
}


/**
 * Appear or Disappear the next, prev buttons if not needed
 * @param {html Dom Element} carousel - The carsoul where the button are in.
 * @param {number} left - scrollLeft of row of carsoul [new || present].
 */
const updateButtons = (carousel, left = -1) => {
    const row = carousel.children[0];

    /* if didn't pass the new value of scroll */
    if (left == -1)
        left = row.scrollLeft;

    carousel.children[1].style.display = left <= 0 ? 'none' : 'flex';
    carousel.children[2].style.display = left >= row.scrollWidth - row.clientWidth ? 'none' : 'flex';
}

const updateAllButtons = () => {
    document.querySelectorAll('.carousel').forEach((element) => updateButtons(element));
}


/** responsible for all dom initalizations at start of page */
const DomStart = () => {

    //1 - remove all useless [prev, next] buttons
    updateAllButtons();

    //2 - activate first tab link
    const firstTabLink = document.querySelector('#category-nav .nav-link');
    firstTabLink.classList.add('active');
    firstTabLink.setAttribute('aria-selected', 'true');

    //3 - deactivate all tap-pane except first one
    const tabPanes = document.querySelectorAll('.tab-pane');
    for (let i = 1; i < tabPanes.length; i++)
        tabPanes[i].classList.remove('active');

}


export { createElementE, updateButtons, updateAllButtons, DomStart }