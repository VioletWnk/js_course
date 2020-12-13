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



let square = new DomElement('.square', '100px', '100px', '#cc3c72');

document.addEventListener("DOMContentLoaded", function() {
    square.create();
    document.querySelector('.square').style.position = 'absolute';
});


document.addEventListener('keydown', function(event) {
    let key = event.key
    let left = document.querySelector('.square').style.left || '0px',
        top = document.querySelector('.square').style.top || '0px',
        leftNum = parseInt(left.slice(0, -2)),
        topNum = parseInt(top.slice(0, -2));


    if(key == 'ArrowLeft'){
        leftNum -= 10;
        document.querySelector('.square').style.left = leftNum + 'px';

    } else if (key == 'ArrowRight'){
        leftNum += 10;
        document.querySelector('.square').style.left = leftNum + 'px';
      
    } else if (key == 'ArrowUp'){
        topNum -= 10;
        document.querySelector('.square').style.top = topNum + 'px'
    } else if (key == 'ArrowDown'){
        topNum += 10;
        document.querySelector('.square').style.top = topNum + 'px'
    }
});





