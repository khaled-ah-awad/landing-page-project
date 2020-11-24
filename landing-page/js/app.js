/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

// Declare Variable To Store Sections List Inside.
const listOfSec = document.querySelectorAll('section');

// Declare Variable To Store The Bullted List Inside.
const uListItem = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions & Main Functions
 * 
 */

const actvSec     = function(item) { item.classList.add('active__link'); };              // Adding Class To The Items That Make Them Active. 

const unActvSec   = function(item) { item.classList.remove('active__link'); };           // Removing The Class To Unactivate The Items.

const secToScroll = function(item) { item.scrollIntoView( { behavior: 'smooth' } ); };   // Scrolling To The Sections. 

// check if element is near the top of viewport
// Define Function To Specifiy Dimensions 
const secInScreen =  function(item)  {

    let secBounds = item.getBoundingClientRect();

    return ( secBounds.top >= -200 && secBounds.bottom <= (window.innerHeight + 300 || document.documentElement.clientHeight + 300) &&
             secBounds.left >= 0 && secBounds.right <= (window.innerWidth || document.documentElement.clientWidth) );

};

// build the nav
// Define Function To Create Navbar .. [ Loop Over It's Items + Append Items To It ]
const createNavList = function () {

    const uListItem = document.getElementById('navbar__list');  // Get The Bullted List By It's ID And Storesd It In A Variable

    for (const sec of listOfSec ) {

        let listItem = document.createElement('li');            // Create List Item.
        let linkItem = document.createElement('a');             // Create Anchor Item.
        linkItem.textContent = sec.getAttribute('data-nav');    // Set The Anchor Content By Attribute Of Sections
        linkItem.setAttribute('class', 'nav__link');            // Set The Anchor Class By Attribute Of Sections
        linkItem.href = '#' + sec.getAttribute('id');           
        linkItem.id = 'nav-' + sec.getAttribute('id');

        listItem.appendChild(linkItem);
        uListItem.appendChild(listItem);
    }

    uListItem.style.visibility = 'visible';
};

/**
 * End Helper Functions & Main Functions
 *  Begin Events
 * 
*/

// Add Event To Create The Navbar After The DOM Fully-Loaded.
document.addEventListener('DOMContentLoaded', function(evt) { createNavList(); });



uListItem.addEventListener('click', function(evt) {

    if (evt.target.nodeName === 'A' && evt.target.className === 'nav__link' ) {
        
        evt.preventDefault();
        const scrollSec = document.querySelector( evt.target.getAttribute('href') );
        secToScroll(scrollSec);

    }
});

// Add Event To Active The Section When Scroll To It.
document.addEventListener('scroll', function() {

    if ( window.pageYOffset < 250 && window.pageYOffset >= 0 ) {

        let linkOfList = document.querySelector('a#nav-' + listOfSec[0].getAttribute('id') );
        actvSec(linkOfList);
        actvSec(listOfSec[0]);

    } else {

        for (const sec of listOfSec) {
            let linkOfList = document.querySelector('a#nav-' + listOfSec[0].getAttribute('id') );
            
            if (secInScreen(sec)) {
                actvSec(linkOfList);
                actvSec(sec);
            } else {
                unActvSec(linkOfList);
                unActvSec(sec);
            }
        }

    }

});









