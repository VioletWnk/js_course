window.addEventListener('DOMContentLoaded', function(){
'use strict';

    //Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

            return {timeRemaining, hours, minutes, seconds};
        }

        function verifyTime(time){
            
            if(time.toString().length === 1){
                return `0${time}`;
            }
            return time;
        }
            


        function updateClock(){
            let timer = getTimeRemaining();

            if(timer.timeRemaining <= 0){
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                timerHours.textContent =  verifyTime(timer.hours);
                timerMinutes.textContent =  verifyTime(timer.minutes);
                timerSeconds.textContent =  verifyTime(timer.seconds);
            }
        }
        
        let idInterval = setInterval(updateClock, 1000);
    }


    countTimer('23 december 2020');


    //menu

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul>li');

            const handlerMenu = () => { 
                menu.classList.toggle('active-menu');
            };

            const scrollAnchor = (e) => {
                e.preventDefault();
                let href = e.target.getAttribute('href');

                const scrollTarget = document.querySelector(href);
                const elementPosition = scrollTarget.getBoundingClientRect().top;

                    window.scrollBy({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
            };

            //     if(!menu.style.transform || menu.style.transform === `translate(-100%)`){
            //         menu.style.transform = `translate(0)`;
            //     }else{
            //         menu.style.transform = `translate(-100%)`;
            //     }
            

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        // for(let i = 0; i < menuItem.length; i++){
        //     menuItem[i].addEventListener('click', handlerMenu);
        // }
        menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu));
        menuItem.forEach((elem) => elem.addEventListener('click', scrollAnchor));

    };

    toggleMenu();



    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');
     
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                let count = -30;
                popupContent.style.left = `${count}%`;

            let timer = setInterval(() => {
                if (count === 38) {
                    clearInterval(timer);
                } else { 
                    popupContent.style.left = `${++count}%`;
                }
              }, 20);

            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();

});