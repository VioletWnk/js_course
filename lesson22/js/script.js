'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
				<span class="text-todo" contenteditable="true">${todo.value}</span>
                <div class="todo-buttons">
                    <button class="todo-edit"></button>
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
        `);

        if(todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }

    }

    addTodo(e) {
        e.preventDefault();
        
            if(this.input.value.trim()){
                const newTodo = {
                    value: this.input.value,
                    completed: false,
                    key: this.generateKey()
                };
                this.todoData.set(newTodo.key, newTodo);
                this.input.value = '';

                this.render()
            } else {
                alert('Это поле не может быть пустым');
            }
           
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 

    }

    deleteItem(li) {
        this.todoData.delete(li.key);
    }

    completeItem(li) {
       let item = this.todoData.get(li.key)
       item.completed = !item.completed;
       this.todoData.set(li.key, item);
       
    }

    editItem(li) {
        let span = li.querySelector('span');
        span.setAttribute('contenteditable', true);
        console.log(span);
    //     let item = this.todoData.get(li.key);
    //     // item.value = 
    //     this.todoData.set(li.key, item);
    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');
       todoContainer.addEventListener('click', (e) => {
            let target = e.target;
            if(target.matches('.todo-complete')){
                this.completeItem(target.closest('li'));
            } else if(target.matches('.todo-remove')) {
                this.deleteItem(target.closest('li'));
            } else if(target.matches('.todo-edit')) {
                //this.editItem(target.closest('li'));
                // let li = target.closest('li');
                // let span = li.querySelector('span');
                // console.log(span);
                // span.setAttribute('contenteditable', true);
            }
            this.render();
       }
       );
    }
       
    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this))
        this.render();
        this.handler();
    }

}
    
const todo = new Todo ('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();