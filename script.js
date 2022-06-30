// import './style.css'
import anime from "animejs"
import {data} from "./data"


// DOM
const navItems = [...document.querySelectorAll('.nav__item')];
const paragraphWrapper = document.querySelector('.paragraph__wrapper');
let headingWrapper = document.querySelectorAll('.heading__line');

// Variables
const bgColor = ['#ffa0a0', '#ffc74f', '#9cd6f0']
const textColor = ['#00347d', '#e93800', '#8a1935']
const easing = 'easeOutExpo';
let currentItem = 0;




/**
 * Text Animation
 */
// Paragraph Animation
const paragraphAnimation = () => {
    const tl = anime.timeline({
        duration: 800,
        easing: easing,
    })
    tl.add({
        targets: paragraphWrapper,
        translateY: -5,
        opacity: 0,
        complete: () => {
            paragraphWrapper.innerHTML = data[currentItem].paragraph
        }
    })
    .add({
        targets: paragraphWrapper,
        translateY: 0,
        opacity: 1,

    })
}

// Heading Text Animation

// Splitting The Heading Text Into Letter Inside <span> Elements Using Regular Expression
headingWrapper.forEach(el => {
    el.innerHTML = el.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

})
let headingLetter = [...document.querySelectorAll(`.letter`)];

// Hiding Heading Text Function
const headingTextHide = () => {
        headingLetter.forEach((letter, i) => {
            const tl = anime.timeline()
                tl.add({
                    targets: letter,
                    translateY: "-110%",
                    duration: 600,
                    delay: 10 * i,
                    easing: easing,
                    complete: () => {
                        document.querySelector('.htmlContent').style.color = textColor[currentItem]
                    }
                })
        })
}

// Revealing Heading Text Function
const headingTextReveal = () => {
    headingWrapper[0].textContent = data[currentItem].heading.headingLine1;
    headingWrapper[1].textContent = data[currentItem].heading.headingLine2;

    // Resplitting The New Heading Text Into Letters Before Revealing
    headingWrapper.forEach(el => {
        el.innerHTML = el.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    })
    headingLetter = [...document.querySelectorAll(`.letter`)];
    headingLetter.forEach((letter, i) => {
        const tl = anime.timeline()
        tl.add({
            targets: letter,
            translateY: "110%",
            duration: 0,
        })

        tl.add({
            targets: letter,
            translateY: 0,
            duration: 800,
            delay: 10 * i,
            easing: easing,
        })
    })
}


navItems.forEach((item, i) => {
    item.addEventListener('click', e => {
        if (currentItem != i) {
            currentItem = i

            // Handling Nav Items (SVG And Numbers) Color Tweak And Animation
            navItems.forEach(itm => {
                itm.classList.remove('nav__item--active')
                itm.style.color = textColor[currentItem]
            })
            e.currentTarget.classList.add('nav__item--active')
            e.currentTarget.style.color = bgColor[currentItem]

            // Animating Heading And Paragraph
            paragraphAnimation();
            headingTextHide();
            setTimeout(headingTextReveal, 500);
        }
    })

})
