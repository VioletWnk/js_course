'use strict';

let start = document.getElementById('start'),
    cancel = document.querySelector('#cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'), 
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),    
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItem = document.querySelectorAll('.income-items');

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

function isText(n){
    return isNaN(parseFloat(n))
};

//Не удалять, это функция проверки ввода данных пользователя
function checkInput(question, callback){
    let answer
    do{
        answer = prompt(question);
    }while(!callback(answer));
    return answer;
}

let appData = {
    income: {}, 
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [], 
    expensesMonth: 0, 
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000, 
    budget: 0, 
    budgetDay: 0, 
    budgetMonth: 0, 
    start: function(){
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
    },
    reset: function(){
        appData.income = {}; 
        appData.incomeMonth = 0;
        appData.addIncome = [];
        appData.expenses = {};
        appData.addExpenses = [];
        appData.expensesMonth = 0;
        appData.deposit = false;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.mission = 100000; 
        appData.budget = 0; 
        appData.budgetDay = 0; 
        appData.budgetMonth = 0; 
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.value = '';  
        });
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = appData.calcPeriod();
        })


    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });   
    },
    getIncome: function(){
        incomeItem.forEach(function(item){
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== ''){
                appData.income[incomeTitle] = incomeAmount;
            }
        });
        for (let key in this.income){
            this.incomeMonth += +this.income[key]
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function(){ 
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function(){ 
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function(){
        return targetAmount.value / this.budgetMonth; 
    },
    getStatusIncome: function(){ 
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
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if(appData.deposit){
            appData.percentDeposit = checkInput('Какой годовой процент?', isNumber);
            appData.moneyDeposit = checkInput('Какая сумма заложена', isNumber);
        }
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    }
};

appData.start = appData.start.bind(appData);

periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);


salaryAmount.addEventListener('change', function(){
    if(salaryAmount.value !== ''){
        start.addEventListener('click', appData.start);
        start.addEventListener('click', function(){ 
            document.querySelectorAll('input[type=text]').forEach(function(item){
                item.disabled = 1;
            });
            start.style='display:none';
            cancel.style='display:block';
        });
    } 
});

cancel.addEventListener('click', function(){ 
    document.querySelectorAll('input[type=text]').forEach(function(item){
        item.disabled = 0;  
    });
    start.style='display:block';
    cancel.style='display:none';
    appData.reset();
});



// if (appData.getTargetMonth() >= 0){
//     console.log('Цель бюдет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев'); 
// } else {
//     console.log('Цель не бюдет достигнута');
// }




// for(let key in appData){
//     console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
// }

// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

// console.log(appData.addExpenses.join(', '));







