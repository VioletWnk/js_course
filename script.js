'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money
let income = 'репетитор'
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000
let period = 7

let start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};
start();


let showTypeof = function(item){
    console.log(typeof item);
};
showTypeof(money);
showTypeof(income);
showTypeof(deposit);


let expenses = [];

// console.log(addExpenses.toLowerCase().split(','));


let getExpensesMonth = function(){ 
    let sum = 0;
    for (let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?', "Ипотека");
        let sum2
        do {
            sum2 = prompt('Во сколько это обойдется?');
        } while (!isNumber(sum2))
        sum += +sum2;
    }
    console.log(expenses);
    return sum;  
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount); 


function getAccumulatedMonth(){
    return money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth();


function getTargetMonth(){
    return mission / accumulatedMonth;
}

if (getTargetMonth() >= 0) {
console.log('Цель бюдет достигнута за: ' + Math.ceil(getTargetMonth())); 
} else {
    console.log('Цель не бюдет достигнута');
}

let budgetDay = accumulatedMonth / 30 
// console.log(budgetDay); 



let getStatusIncome = function(){
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    }
        else if (budgetDay >= 600 && budgetDay <= 1200) {
            return('У вас средний  уровень дохода');
        }
        else if (budgetDay >= 0 && budgetDay < 600) {
            return('К сожалению у вас уровень дохода ниже среднего');
        }
        else {
            return('Что то пошло не так');
        }
};
console.log(getStatusIncome());
