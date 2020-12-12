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

const domElement = new DomElement('.block', '120px', '120px', '#aaaaaa', '24px');
domElement.create();
