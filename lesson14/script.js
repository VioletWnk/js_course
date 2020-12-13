const DomElement = function(selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.create = function(){

    const firstElement = this.selector.substring(0, 1);
    const attribute = this.selector.substring(1);
    let element;
        if(firstElement == '.'){
            element = document.createElement('div')
            element.classList.add(attribute);
        } else if(firstElement == '#'){
            element = document.createElement('p')
            element.setAttribute('id', attribute);
        }

    element.style.cssText = 'height:' + this.height + '; width:' + this.width + '; background:' + this.bg + '; font-size:' + this.fontSize + ';';
    element.textContent = 'Hello, world';

    document.querySelector('body').insertAdjacentElement('afterbegin', element);
};

// const domElement = new DomElement('.block', '120px', '120px', '#aaaaaa', '24px');
// domElement.create();


// 1) Используя class DomElement из основного задания №1, создать квадрат 100 на 100 пикселей. 
//Ему необходимо задать фон(background) любого цвета и свойство position: absolute.

let square = new DomElement();
square.height = '100px';
square.width = '100px';
square.bg = '#cc3c72';
square.position = 'absolute';

console.log(square);

// 2) Поместить его на страницу только после выполнения события DOMContentLoaded. 
//Внутри тега body  должно быть только подключение скрипта.
document.addEventListener("DOMContentLoaded", function() {
    square.create();
});


// 3) Написать обработчик события для keydown, который будет принимать callback-функцию. Данная функция будет отлавливать 
//нажатие на стрелки клавиатуры. В зависимости от нажатой кнопки(Вверх - стрелка вверх, Влево - стрелка влево, Вправо - стрелка вправо, 
//Вниз - стрелка вниз) наш квадрат будет перемещаться на 10 пикселей.


square.addEventListener('keydown', callback);


let arrowClick = function() {
    let key = key
    if(key == 'ArrowLeft'){
        console.log('psss');
    } else if (key == 'ArrowRight'){
        console.log('prrr');
    } else if (key == 'ArrowUp'){k
        console.log('pruuuu');
    } else if (key == 'ArrowDown'){
        console.log('pow');
    }
};





