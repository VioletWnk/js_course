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
        const body = document.querySelector('body'),
            menu = document.querySelector('menu');


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

        
            body.addEventListener('click', (event) => {
                let target = event.target;

                if(target.closest('.menu') || target.matches('.close-btn')){
                    handlerMenu();
                } else if(target.matches('a') && target.closest('menu')){
                    handlerMenu();
                    scrollAnchor(event);
                } else { 
                    if(!target.closest('menu') && menu.classList.contains('active-menu')){
                        handlerMenu();
                    }
                }

            });

    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn');
     
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


        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else { 
                target = target.closest('.popup-content');

                    if(!target){
                        popup.style.display = 'none';
                    }

            }

           
        })
    };

    togglePopUp();

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if(target.classList.contains('service-header-tab')){
               tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
               }); 
            }
        });
    };

    tabs();

});