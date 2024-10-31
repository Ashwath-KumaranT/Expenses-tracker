*Expense Tracker:*
  A simple web-based Expense Tracker application that helps you manage and track your income and expenses, keeping you informed of your current balance, total budget, and expenses.

*Features:*
  *Add Income:* Record various types of income with a specified date.
  *Add Expense:* Record expenses, including type and date. Alerts if expenses exceed the available balance but still allow the entry.
  *Delete Budget:* Reset the budget, balance, and expenses.
  *Edit and Delete Entries:* Modify or remove existing income or expense entries. Editing an entry deducts the original amount from totals before adding the new value.
  *Filter View:* Display all entries or filter to view only income or only expense items.
  *Persistent Data:* Saves data to localStorage to maintain data even after page reloads.
  
*Technologies Used:*
  *HTML:* Structure of the application
  *CSS:* Basic styling and layout
  *JavaScript:* Core functionality and logic for managing data, updating the display, and storing data in localStorage.

*Usage:*
  *Adding Budget:*
    Enter the budget amount in the "Budget" field and click Add Budget.
    The amount will be added to the Total Budget and Current Balance fields.
    The Total Budget, Current Balance, and Total Expense values persist even if the page is reloaded.
  
  *Adding Income:*
    Select an Income Type, enter the Income Amount, and select a Date.
    Click Add Income to add it to the income list and increase the Total Budget and Current Balance.
    
  *Adding Expense:*
    Select an Expense Type, enter the Expense Amount, and select a Date.
    Click Add Expense to add it to the expenses list.
    If the expense amount exceeds the Current Balance, an alert notifies you, but the expense will still be added.
    
  *Editing Entries:*
    To edit, click the Edit button next to an entry. The entry fields will populate with existing data.
    Modify the values and re-save the entry. The old amount will be subtracted from the totals, and the new amount will be added.
    
  *Deleting Entries:*
    To delete, click the Delete button next to an entry.
    The entry is removed, and balances are adjusted accordingly.
    
  *Filtering Entries:*
    Use the Filter options to view all items, only income, or only expense entries.
