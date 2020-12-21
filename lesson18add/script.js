'use strict';
const body = document.querySelector('body');
let date = new Date();

let day = date.getDay(),
    time = date.getTime(),
    deadline = new Date('31 december 2020').getTime(),
    remainingDays = Math.floor((deadline - time) / 60 / 60 / 24 / 1000);


    let options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

const todayDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayStage = ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи'];

    let currentStage;

    if(date.getHours() >= 4 && date.getHours() < 12){
        currentStage = dayStage[0];
        }else if(date.getHours() >= 12 && date.getHours() <= 16){
            currentStage = dayStage[1];
        }else if(date.getHours() >= 17 && date.getHours() <= 22){
            currentStage = dayStage[2];
        }else{
            currentStage = dayStage[3];
        }

body.innerHTML += `
<p>${currentStage}</p>
<p>Сегодня: ${todayDay[day]}</p>
<p>Текущее время: ${date.toLocaleString("ru", options)} PM</p>
<p>До нового года осталось ${remainingDays} дней</p>`;