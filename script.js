'use strict';

let money
let start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};
start();
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

function isText(n){
    return isNaN(parseFloat(n))
};

function checkInput(question, callback){
    let answer
    do{
        answer = prompt(question);
    }while(!callback(answer));
    return answer;
}

let appData = {
    income: {}, 
    addIncome: {},
    expenses: {},
    addExpenses: {}, 
    expensesMonth: 0, 
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000, 
    period: 3, 
    budget: money, 
    budgetDay: 0, 
    budgetMonth: 0, 
    asking: function(){
        if (confirm('Есть ли у вас дополнительный заработок?')){
            
            let itemIncome = checkInput('Какой у вас есть дополнительный заработок?', isText);
            let cashIncome = checkInput('Сколько в мсеяц зарабатываете на этом?', isNumber);
           
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = checkInput('Перечислите возможные расходы за рассчитываемый период через запятую', isText);
        
        appData.addExpenses = addExpenses.toLowerCase().split(',').map(function(item){
            item = item.trim();
            return item.slice(0, 1).toUpperCase() + item.slice(1);
        });

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
            
        for (let i = 0; i < 2; i++){
            let key = prompt('Введите обязательную статью расходов?', "Ипотека");
            let value = checkInput('Во сколько это обойдется?', isNumber);
            appData.expenses[key] = +value;
        }
    },
    getExpensesMonth: function(){ // Расчитывает сумму всех обязательных расходов и записывает в переменную
        let sumExpenses = 0;
        for(let key in appData.expenses){
            sumExpenses += appData.expenses[key];
        }
        appData.expensesMonth = sumExpenses;
    },
    getBudget: function(){ // Высчитывает остаток средст после выплат обяз расходов на день и на месяц
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function(){
        return appData.mission / appData.budgetMonth; //Кол-во месяцев за которое мы достигнем цели
    },
    getStatusIncome: function(){ //Инфа об уровне дохода
        if (appData.budgetDay > 1200) {
            return('У вас высокий уровень дохода');
        }
        else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            return('У вас средний  уровень дохода');
        }
        else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            return('К сожалению у вас уровень дохода ниже среднего');
        }
        else {
            return('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = checkInput('Какой годовой процент?', isNumber);
            appData.moneyDeposit = checkInput('Какая сумма заложена', isNumber);
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();
console.log(appData);

appData.getExpensesMonth();
console.log('Расходы за месяц ' + appData.expensesMonth);

appData.getBudget();

if (appData.getTargetMonth() >= 0){
    console.log('Цель бюдет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев'); 
} else {
    console.log('Цель не бюдет достигнута');
}

console.log(appData.getStatusIncome()); 


for(let key in appData){
    console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());




console.log(appData.addExpenses.join(', '));

//lesson09
// Кнопку "Рассчитать" через id

let button = document.getElementById('start');

// Кнопки “+” (плюс) через Tag, каждую в своей переменной. 
let buttonPlus1 = document.getElementsByTagName('button')[0];
let buttonPlus2 = document.getElementsByTagName('button')[1];

// Чекбокс по id через querySelector

let checkBox = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll

let incomeArea = document.querySelectorAll('.additional_income-item');

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">

let fieldBudgetMonth = document.getElementsByClassName('.budget_month-value')[0];
let fieldBudgetDay = document.getElementsByClassName('.budget_day-value')[0];
let fieldExpenses = document.getElementsByClassName('.expenses_month-value')[0];
let fieldIncome = document.getElementsByClassName('.additional_income-value')[0];
let fieldAddExp = document.getElementsByClassName('.additional_expenses-value')[0];
let fieldPeriod = document.getElementsByClassName('.income_period-value')[0];
let fieldTarget = document.getElementsByClassName('.target_month-value')[0];



// Оставшиеся поля через querySelector каждый в отдельную переменную:

let salary = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let expensesValue = document.querySelector('.additional_expenses-item');

// поля ввода (input) с левой стороны и не забудьте про range.

let targetAmount = document.querySelector('.target-amount');
let range = document.querySelector('[type="range"]');