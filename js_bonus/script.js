'use strict';

const userName = document.querySelector('#username'),
    signIn = document.querySelector('#signin'),
    login = document.querySelector('#login'),
    list = document.querySelector('#list');

const usersData = JSON.parse(localStorage.getItem('usersData')) || [];


signIn.addEventListener('click', function(){
    let fullname 
        do { 
            fullname = prompt('Введите Имя и Фамилию через пробел');
        } while (fullname == '');
  
   
    const name = fullname.split(' ')[0],
        surname = fullname.split(' ')[1],
        nickname =  prompt('Введите никнейм'),
        pass = prompt('Введите пароль');

    const date = new Date();
    
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

        let newUser = {
                name: name,
                surname: surname,
                nickname: nickname,
                password: pass,
                date: date.toLocaleString("ru", options) 
            };

    usersData.push(newUser);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    createList();  
});

const createList = function(){
    list.textContent = '';

    usersData.forEach(function(item, key){
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerHTML = '<span class="first-name">' + item.name + ' ' + item.surname +
        '</span>' + ', '+ '<span class="data">' + item.date + '</span>' + '<button class="btn-delete">удалить</button>';
            list.append(li);


        const btnDelete = li.querySelector('.btn-delete');
            btnDelete.addEventListener('click', function(){
                usersData.splice(key, 1);
                localStorage.setItem('usersData', JSON.stringify(usersData));
                createList();
            });
    });
};


login.addEventListener('click', function(){
    const login = prompt('Введите логин');
    const pass = prompt('Введите пароль');

    if(usersData.length !== 0){
        let verify = false;
        usersData.forEach(function(item, key){
            if (login === item.nickname && pass === item.password){
                verify = true;
                username.innerHTML = item.name;
            } 
        });
        if(verify == false){
            alert('Пользователь не найден');
        }
    } else {
        alert('Пользователь не найден');
    } 
});
createList();  





