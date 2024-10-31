// Variable and array declaratio 
const totalBudget = document.getElementById('total-budget');
const currentBalance = document.getElementById('current-balance');
const totalExpense = document.getElementById('total-expense');
let expensesItems = JSON.parse(localStorage.getItem("expensesItems")) || [];
const filterOption = localStorage.getItem("filter-option") || "all";

// Local storage maintaining 
window.onload = function() {
    const savedTotalBudget = localStorage.getItem("total-budget") || 0;
    const savedCurrentBalance = localStorage.getItem("current-balance") || 0;
    const savedTotalExpense = localStorage.getItem("total-expense") || 0;

    totalBudget.innerText = savedTotalBudget;
    currentBalance.innerText = savedCurrentBalance;
    totalExpense.innerText = savedTotalExpense;

    document.querySelector(`input[name="filter"][value="${filterOption}"]`).checked = true;
    updateExpenseList(); 
};

// Budget Adding 
function addbudget() {
    const value = +(document.getElementById('budget').value);
    if (!isNaN(value) && value > 0) {
        const updatedTotalBudget = +(totalBudget.innerText || 0) + value;
        const updatedCurrentBalance = +(currentBalance.innerText || 0) + value; 
        const updatedTotalExpense = +(totalExpense.innerText || 0); 

        totalBudget.innerText = updatedTotalBudget;
        currentBalance.innerText = updatedCurrentBalance;
        totalExpense.innerText = updatedTotalExpense;

        localStorage.setItem("total-budget", JSON.stringify(updatedTotalBudget));
        localStorage.setItem("current-balance", JSON.stringify(updatedCurrentBalance));
        localStorage.setItem("total-expense", JSON.stringify(updatedTotalExpense));
    } else {
        alert('Please enter a valid number');
    }
    document.getElementById('budget').value = '';
}

// Delete entire calculation 
function deletebudget() {
    totalBudget.innerText = 0;
    currentBalance.innerText = 0;
    totalExpense.innerText = 0;
    expensesItems = []; 
    localStorage.setItem("total-budget", JSON.stringify(0));
    localStorage.setItem("current-balance", JSON.stringify(0));
    localStorage.setItem("total-expense", JSON.stringify(0));
    localStorage.removeItem("expensesItems"); 
    updateExpenseList();
}

// Adding expense to the budget
function addexpense() {
    const expenseType = document.getElementById('expense-type').value;
    const expense = +(document.getElementById('expense-amount').value);
    const expensedate = document.getElementById('expense-date').value;
    const currentBalanceAmount = +currentBalance.innerText;

    if (expenseType && !isNaN(expense) && expense > 0 && expensedate) {
        if (expense > currentBalanceAmount) {
            alert("This month budget is over, and you are spending beyond your budget");
        } 
        expensesItems.push({ expenseType: expenseType, expense: expense, expensedate: expensedate, type: 'expense' });
        localStorage.setItem("expensesItems", JSON.stringify(expensesItems));

        updateCurrentBalance(-expense); 
        updateTotalExpense(expense);
        updateExpenseList();
    } 
    else {
        alert("Please fill in all expense details correctly.");
    }
    document.getElementById('expense-type').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
}

// Adding Income to the budget 
function addIncome() {
    const incomeType = document.getElementById('income-type').value; 
    const income = +(document.getElementById('income-amount').value);
    const incomeDate = document.getElementById('income-date').value; 

    if (incomeType && !isNaN(income) && income > 0 && incomeDate) {
        expensesItems.push({ expenseType: incomeType, expense: income, expensedate: incomeDate, type: 'income' });
        localStorage.setItem("expensesItems", JSON.stringify(expensesItems));

        updateCurrentBalance(income); 
        updateTotalBudget(income); 
        updateExpenseList();
    } else {
        alert("Please fill in all income details correctly.");
    }
    document.getElementById('income-type').value = '';
    document.getElementById('income-amount').value = '';
    document.getElementById('income-date').value = '';
}

// Updating current balance 
function updateCurrentBalance(amount) {
    const updatedCurrentBalance = +(currentBalance.innerText) + amount;
    currentBalance.innerText = updatedCurrentBalance;
    localStorage.setItem("current-balance", JSON.stringify(updatedCurrentBalance));
}

// Updating total budget 
function updateTotalBudget(income) {
    const updatedTotalBudget = +(totalBudget.innerText) + income; 
    totalBudget.innerText = updatedTotalBudget;
    localStorage.setItem("total-budget", JSON.stringify(updatedTotalBudget));
}

// Updating total expenses 
function updateTotalExpense(expense) {
    const updatedTotalExpense = +(totalExpense.innerText) + expense;
    totalExpense.innerText = updatedTotalExpense;
    localStorage.setItem("total-expense", JSON.stringify(updatedTotalExpense));
}

// Updating the expense array list 
function updateExpenseList() {
    const list = document.getElementById('expenses-items');
    list.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = "list-disc list-inside";

    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    localStorage.setItem("filter-option", selectedFilter);

    expensesItems.forEach(function(item) {
        if (selectedFilter === "all" || (selectedFilter === "income" && item.type === "income") || (selectedFilter === "expense" && item.type === "expense")) {
            const expenseItem = document.createElement('li');
            expenseItem.className = "p-2 border-b border-gray-300 flex justify-between";
            expenseItem.innerHTML = `
                <div>Item: ${item.expenseType} | Amount: ${item.expense} | Date: ${item.expensedate} | Type: ${item.type}</div>
            `;

            const editBtn = document.createElement('button');
            editBtn.className = "bg-blue-500 text-white p-2 px-4 font-semibold rounded-lg";
            editBtn.innerText = 'Edit';
            editBtn.onclick = function() {
                editExpense(expensesItems.indexOf(item));
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.className = "bg-red-500 text-white p-2 px-4 font-semibold rounded-lg";
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = function() {
                deleteExpense(expensesItems.indexOf(item)); 
            };

            expenseItem.appendChild(editBtn);
            expenseItem.appendChild(deleteBtn);

            ul.appendChild(expenseItem);
        }
    });

    list.appendChild(ul);
}

// Editing an existing item in the expense list 
function editExpense(index) {
    const item = expensesItems[index];
    if (item.type === 'income') {
        document.getElementById('income-type').value = item.expenseType;
        document.getElementById('income-amount').value = item.expense;
        document.getElementById('income-date').value = item.expensedate;

        expensesItems.splice(index, 1);
        localStorage.setItem("expensesItems", JSON.stringify(expensesItems));

        const updatedCurrentBalance = +(currentBalance.innerText) - item.expense; 
        currentBalance.innerText = updatedCurrentBalance;
        localStorage.setItem("current-balance", JSON.stringify(updatedCurrentBalance));

        const updatedTotalBudget = +(totalBudget.innerText) - item.expense; 
        totalBudget.innerText = updatedTotalBudget;
        localStorage.setItem("current-balance", JSON.stringify(updatedTotalBudget));
    } else {
        document.getElementById('expense-type').value = item.expenseType;
        document.getElementById('expense-amount').value = item.expense;
        document.getElementById('expense-date').value = item.expensedate;

        // Remove item and update localStorage
        expensesItems.splice(index, 1);
        localStorage.setItem("expensesItems", JSON.stringify(expensesItems));

        // Adjust balance and total expense for edited expense item
        updateCurrentBalance(item.expense); // Return expense to balance
        updateTotalExpense(-item.expense);
    }
    updateExpenseList();
}

// Deleting an item from the existing list 
function deleteExpense(index) {
    const item = expensesItems[index]; 
    const amount = item.expense;

    expensesItems.splice(index, 1);
    localStorage.setItem("expensesItems", JSON.stringify(expensesItems));

    if (item.type === 'income') {
        const updatedTotalBudget = +(totalBudget.innerText) - amount;
        totalBudget.innerText = updatedTotalBudget;
        localStorage.setItem("total-budget", JSON.stringify(updatedTotalBudget));

        const updatedCurrentBalance = +(currentBalance.innerText) - amount; 
        currentBalance.innerText = updatedCurrentBalance;
        localStorage.setItem("current-balance", JSON.stringify(updatedCurrentBalance));
    } else if (item.type === 'expense') {
        const updatedCurrentBalance = +(currentBalance.innerText) + amount;
        currentBalance.innerText = updatedCurrentBalance;
        localStorage.setItem("current-balance", JSON.stringify(updatedCurrentBalance));

        const updatedTotalExpense = +(totalExpense.innerText) - amount; 
        totalExpense.innerText = updatedTotalExpense;
        localStorage.setItem("total-expense", JSON.stringify(updatedTotalExpense));
    }
    updateExpenseList();
}

// Radio button filtering calling 
document.querySelectorAll('input[name="filter"]').forEach(function(radio) {
    radio.addEventListener('change', updateExpenseList);
});

