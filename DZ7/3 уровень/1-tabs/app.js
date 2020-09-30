'use strict';

const texts = {
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    text2: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
    text3: 'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил.'
};

/* 
1. Получите ссылку на .text, например с помощью querySelector
2. Получите коллекцию, в которой хранятся все .nav-link, например с помощью querySelectorAll
    2.1 Переберите полученную коллекцию, например с помощью forEach, и каждой ссылке назначьте
    обработчик клика функцию clickHandler.
*/

let text = document.querySelector('.text');
let navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function clickHandler(link) {
    link.addEventListener('click', function clickHandler(link) {
        changeActiveClass(link);
        changeText(link);
    });
});

/**
 * Эта функция должна убирать .active у предыдущего .nav-link и ставить его
 * на тот, по которому кликнули.
 * @param {MouseEvent} event 
 */

function changeActiveClass(link) {
    //link.classList.toggle('active');
    for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].classList.contains('active')) {
            navLinks[i].classList.remove('active');
        };
        continue;
    }
    link.currentTarget.classList.add('active');
}

/**
 * Эта фукнция должна читать текст (например через textContent) из 
 * .nav-link по которому кликнули и в зависимости от этого в .text
 * ставить соответствующий текст из texts.
 * @param {MouseEvent} event 
 */

function changeText(link) {
    switch (link.currentTarget.innerHTML) {
        case "Link 1":
            text.innerHTML = texts.text1;
            break;
        case "Link 2":
            text.innerHTML = texts.text2;
            break;
        case "Link 3":
            text.innerHTML = texts.text3;
            break;
    }
}
