'use strict';

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const isText = (n) => isNaN(parseFloat(n));

//Не удалять, это функция проверки ввода данных пользователя
const checkInput = (question, callback) => {
    let answer
    do{
        answer = prompt(question);
    }while(!callback(answer));
    return answer;
}


const start = document.getElementById('start'),
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

class AppData {
    constructor(){
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
    }
    check(){
        if(salaryAmount.value !== ''){
            start.removeAttribute('disabled');
            return;
        }
    }      
    start(){
        if(salaryAmount.value === ''){
            start.setAttribute('disabled', 'true');
            return; 
        } 
        
        document.querySelectorAll('input[type=text]').forEach((item) => {
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
    }
    reset(){
        document.querySelectorAll('input[type=text]').forEach((item) => {
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
        
    }
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.calcPeriod();
        })  
    }
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }
    addIncomeBlock(){
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            incomePlus.style.display = 'none';
        }
    } 
    getExpenses(){
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });  
    }
    getIncome(){
        incomeItem.forEach((item) => {
            const incomeTitle = item.querySelector('.income-title').value;
            const incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== ''){
               this.income[incomeTitle] = incomeAmount;
            }
        });
        for (let key in this.income){
            this.incomeMonth += +this.income[key]
        }
    }
    getAddExpenses(){
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== ''){
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome(){
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth(){
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget(){
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth(){
        return targetAmount.value / this.budgetMonth; 
    }
    getStatusIncome(){
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
    }
    getInfoDeposit(){
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if(this.deposit){
            this.percentDeposit = checkInput('Какой годовой процент?', isNumber);
            this.moneyDeposit = checkInput('Какая сумма заложена', isNumber);
        }
    }
    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }
    eventListeners(){
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('change', this.check());
        cancel.addEventListener('click', this.reset.bind(this));
        
        periodSelect.addEventListener('input', () => {
            periodAmount.innerHTML = periodSelect.value;
        });
    }
};
    const appData = new AppData();
    appData.eventListeners();






