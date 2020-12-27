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
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'), 
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
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
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

        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';


   

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
        let items = document.querySelectorAll('.expenses-items');
        if(items.length === 3){
            expensesPlus.style.display = 'none';
        }
    }
    addIncomeBlock(){
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        let items = document.querySelectorAll('.income-items');
        if(items.length === 3){
            incomePlus.style.display = 'none';
        }
    } 
    getExpInc(){

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
             }
        }

        incomeItem.forEach(count);
        expensesItems.forEach(count);

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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100)
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth + monthDeposit;
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
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }

    changePercent() {
        const valueSelect = this.value;

        const checkPercent = () => {
            if(isNumber(depositPercent.value) && depositPercent.value > 0 && depositPercent.value <= 100) {
                start.removeAttribute('disabled');
            } else {
                alert('Введите корректное значение в поле проценты');
                start.setAttribute('disabled', 'true');
            }
        }

        if (valueSelect === 'other') {
            depositPercent.addEventListener('change', checkPercent);
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.removeEventListener('change', checkPercent);
        }
    }

    depositHandler() {
        if (depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
            depositPercent.style.display = 'none';
            depositPercent.value = '';
        }
    }
    eventListeners(){
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('input', this.check);
        cancel.addEventListener('click', this.reset.bind(this));
        
        periodSelect.addEventListener('input', () => {
            periodAmount.innerHTML = periodSelect.value;
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
};
    const appData = new AppData();
    appData.eventListeners();






