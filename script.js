'use strict';

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

const AppData = function(){

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {}; 
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

    AppData.prototype.check = function(){
        if(salaryAmount.value !== ''){
            start.removeAttribute('disabled');
            return; 
        }
    }; 


    AppData.prototype.start = function(){
        if(salaryAmount.value === ''){
            start.setAttribute('disabled', 'true');
            return; 
        } 
        
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.setAttribute('disabled', 'true');
        });
        incomePlus.setAttribute('disabled', 'true');
        expensesPlus.setAttribute('disabled', 'true');
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();

    };
    AppData.prototype.reset = function(){

        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.value = '';
            item.disabled = 0;   
        });
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;

        incomePlus.removeAttribute('disabled');
        expensesPlus.removeAttribute('disabled');
        start.style.display = 'block';
        cancel.style.display = 'none';
   

        this.income = {}; 
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0; 
        this.budgetDay = 0; 
        this.budgetMonth = 0; 
        
    };
    AppData.prototype.showResult = function(){
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = _this.calcPeriod();
        })
    };
    AppData.prototype.addExpensesBlock = function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    };
    AppData.prototype.addIncomeBlock = function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            incomePlus.style.display = 'none';
        }
    };
    AppData.prototype.getExpenses = function(){
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });   
    };
    AppData.prototype.getIncome = function(){
        const _this = this;
        incomeItem.forEach(function(item){
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== ''){
               _this.income[incomeTitle] = incomeAmount;
            }
        });
        for (let key in this.income){
            this.incomeMonth += +this.income[key]
        }
    };
    AppData.prototype.getAddExpenses = function(){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getAddIncome = function(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    };
    AppData.prototype.getExpensesMonth = function(){ 
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    };
    AppData.prototype.getBudget = function(){ 
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    };
    AppData.prototype.getTargetMonth = function(){
        return targetAmount.value / this.budgetMonth; 
    };
    AppData.prototype.getStatusIncome = function(){ 
        if (this.budgetDay > 1200) {
            return('У вас высокий уровень дохода');
        }
        else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            return('У вас средний  уровень дохода');
        }
        else if (this.budgetDay >= 0 && this.budgetDay < 600) {
            return('К сожалению у вас уровень дохода ниже среднего');
        }
        else {
            return('Что то пошло не так');
        }
    };
    AppData.prototype.getInfoDeposit = function(){
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if(this.deposit){
            this.percentDeposit = checkInput('Какой годовой процент?', isNumber);
            this.moneyDeposit = checkInput('Какая сумма заложена', isNumber);
        }
    };
    AppData.prototype.calcPeriod = function(){
        return this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.eventListeners = function(){
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('change', this.check());
        cancel.addEventListener('click', this.reset.bind(this));
        
        periodSelect.addEventListener('input', function(){
            periodAmount.innerHTML = periodSelect.value;
        });
    };


    const appData = new AppData();
    appData.eventListeners();






