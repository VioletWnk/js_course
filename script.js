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


let appData = {
    income: {},
    addIncome: {},
    expenses: {}, //Список трат и их сумма
    addExpenses: {}, // Список обязательных трат
    expensesMonth: 0, //Сумма обязательных трат на месяц
    deposit: false,
    mission: 100000, //Cумма, кот мы хотим накопить
    period: 3, // Период за который мы хотим накопить сумму
    budget: money, //Зарплата
    budgetDay: 0, // Остаток средств на день
    budgetMonth: 0, // Месячный остаток средств
    asking: function(){ // Спрашивает у пользователя информацию 
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            
        for (let i = 0; i < 2; i++){
            let key = prompt('Введите обязательную статью расходов?', "Ипотека");
            let value;
            do {
                value = prompt('Во сколько это обойдется?');
            } while (!isNumber(value))
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
    getTargetMonth: function (){
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