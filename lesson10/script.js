'use strict';

// Восстановить порядок книг.
const books = document.querySelectorAll('.book');
books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);

// Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';


// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")

let titles = document.querySelectorAll('h2 > a');
titles[2].textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
const adv = document.querySelector('.adv');
adv.remove();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)

let chapters = books[0].querySelectorAll('li');
chapters[3].after(chapters[6]);
chapters[6].after(chapters[8]);
chapters[9].after(chapters[2]);


let chaptersFive = books[5].querySelectorAll('li');

chaptersFive[7].after(chaptersFive[5]);
chaptersFive[1].after(chaptersFive[9]);
chaptersFive[6].before(chaptersFive[2]);
// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место

let li = books[2].querySelectorAll('li');
li[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');