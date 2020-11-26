'use strict';


//lesson01
let money = 70000
let income = 'репетитор'
let addExpenses = 'интернет, ипотека, продукты'
let deposit = true
let mission = 100000
let period = 7
let budgetDay = money / 30


//lesson02
console.log(typeof money);
// console.log(addExpenses.length);
// console.log('Период равен ' + period + ' месяцев')
// console.log('Цель заработать ' + mission + ' рублей')
// console.log(addExpenses.toLowerCase().split(', '));
// console.log(budgetDay);


//lesson03
money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');


let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

// console.log('Бюджет на месяц: ' + budgetMonth);
// console.log('Цель бюдет достигнута за: ' + Math.round(mission / (budgetMonth)));
// budgetDay = budgetMonth / 30
// console.log('Бюджет на день: ' + Math.ceil(budgetDay));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
}
    else if (budgetDay >= 600 && budgetDay <= 1200) {
        console.log('У вас средний  уровень дохода');
    }
    else if (budgetDay >= 0 && budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }
    else {
        console.log('Что то пошло не так');
    }


    
//lesson04

function getExpensesMonth(){ 
    return amount1 + amount2;
}
console.log(getExpensesMonth()); //Расходы за месяц вызов getExpensesMonth


function getAccumulatedMonth(){
    return money - (amount1 + amount2);
}
let accumulatedMonth = getAccumulatedMonth();


function getTargetMonth(){
    return mission / accumulatedMonth;
}
console.log(getTargetMonth()); // Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 


budgetDay = accumulatedMonth / 30 
console.log(budgetDay); //Бюджет на день (budgetDay)
console.log(addExpenses.split()); //Вывод возможных расходов в виде массива (addExpenses)