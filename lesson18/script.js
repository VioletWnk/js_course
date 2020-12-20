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


    countTimer('22 december 2020');

});