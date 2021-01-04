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

//slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        dots = document.querySelector('.portfolio-dots');

        slide.forEach((item) => {
            let li = document.createElement('li')
            li.classList.add('dot');

            if(item.classList.contains('portfolio-item-active')){
                li.classList.add('dot-active');
            }
            dots.append(li);
        });

        const btn = document.querySelectorAll('.portfolio-btn'), 
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlay = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlay, time);
        };


        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }

            if(currentSlide < 0){
                currentSlide = slide.length - 1
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    //our team 

    const changeImage = () => {
        const command = document.querySelector('#command');
        const changeImg = (event) => {
            if(event.target.matches('.command__photo')){
                let image = event.target.getAttribute('data-img'),
                    src = event.target.getAttribute('src');
                    event.target.setAttribute('src', image);
                    event.target.setAttribute('data-img', src);
            }
        };

        
        command.addEventListener('mouseover', (event) => {
            changeImg(event);
        });

        command.addEventListener('mouseout', (event) => {
            changeImg(event);
        });

    };

    changeImage();

    //input verification
    const validateInput = () => {

        const inputs = document.querySelector('.calc-block');
        inputs.addEventListener('input', (event) => {
            if(event.target.matches('input')){
                let inputVer = event.target.value.match(/\d+/);
                event.target.value = inputVer;
            }  
        });
    };

    validateInput();

    //calculator

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

                if(calcCount.value > 1){
                    countValue += (calcCount.value - 1) / 10;
                }

                if(calcDay.value && calcDay.value < 5){
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }

                if(typeValue && squareValue){
                    total = price * squareValue * typeValue * countValue * dayValue;
                }

                const updateCount = () => {
                    let count = +totalValue.textContent;
                    const step = 200;
    
                    let inc = total / step; 
                    if (count < total) {
                        totalValue.textContent = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } 
                    else {
                        totalValue.textContent = Math.ceil(total)
                    }
                };
                updateCount();
        };

        calcBlock.addEventListener('input', (event) => {
            const target = event.target;
            if(target.matches('.calc-type') || target.matches('.calc-square') || 
            target.matches('.calc-day') || target.matches('.calc-count')){
                countSum();
            }

        });

    };

    calc(100);

});