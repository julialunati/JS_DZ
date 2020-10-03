'use strict';
// 1. получите все кнопки и сохраните в переменную

let buttons = document.querySelectorAll('button');

// 1.1 затем проитерируйтесь по кнопкам и каждой из
// них добавьте обработчик клика - функцию handleClick

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        handleClick(this);
    });
});

/**
 * Функция обрабатывает клик по кнопке в карточке товара и попеременно вызывает
 * функции для показа или скрытия текста о товаре.
 * @param {MouseEvent} clickedButtonEvent 
 */
function handleClick(clickedButtonEvent) {
    // 2. из объекта события получите ссылку на .product и
    // сохраните в переменную:
    const cardNode = clickedButtonEvent.parentNode;

    // 3. создайте литерал объекта со следующими свойствами:
    const card = {
        wrap: cardNode, // здесь элемент с классом .product
        img: cardNode.childNodes[3], // здесь картинка внутри .product
        productName: cardNode.childNodes[1], // здесь .productName, который внутри .product
        button: cardNode.childNodes[5], // здесь button, который внутри .product
    };

    // 4. получаем текст на кнопке, которая внутри .product
    if (card.button.innerHTML == "Подробнее") { // 4.1 проверяем равняется ли этот текст строке "Подробнее"
        // 4.2 если да, то передаем объект card в функцию showMoreText
        showMoreText(card);
    } else if (cardNode.childNodes[6].innerHTML == "Отмена") { // 4.3 проверяем равняется ли текст на кнопке строке "Отмена"
        // 4.4 если да, то передаем объект card в функцию hideMoreText
        hideMoreText(card);
    }
}

/**
 * Функция скрывает текст с описанием товара.
 * @param {Object} card 
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLButtonElement} card.button
 */

function hideMoreText(card) {
    // 5. картинке внутри .product ставим стиль display: block
    card.wrap.childNodes[4].setAttribute("style","display: block");
    
    // 5.1 внутри .product находим элемент с классом .desc и удаляем его
    card.wrap.childNodes[2].remove();

    // 5.2 кнопке, которая внутри .product ставим текст "Подробнее"
    card.button.nextSibling.innerText = card.button.nextSibling.innerText.replace("Отмена","Подробнее");
}

/**
 * Функция показывает текст с описанием товара.
 * @param {Object} card 
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLButtonElement} card.button 
 */
function showMoreText(card) {
    // 6. картинке внутри .product ставим display: none
    card.img.setAttribute("style","display: none");
    
    // 6.1 сохраняем произвольный текст в переменную
    let text = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
    
    // 6.2 внутри .product есть .productName, после него вставляем div.desc и текстом из переменной из п. 6.1
    card.productName.insertAdjacentHTML("afterend",`<div class="desc">${text}</div>`);
    
    // 6.3 внутри .product у кнопки текст ставим "Отмена"
    card.button.innerText = card.button.innerText.replace("Подробнее","Отмена");
    
}