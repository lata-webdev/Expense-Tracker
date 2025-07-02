document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    const toggleBtn = document.getElementById("theme-toggle");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function updateTotal() {
        const totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function saveExpensesToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const li = document.createElement("li");

            li.innerHTML = `
                <div class="expense-text">${expense.name} - $${expense.amount.toFixed(2)}</div>
                <button data-id="${expense.id}">Delete</button>
            `;

            expenseList.appendChild(li);
        });
    }

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };

            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter(expense => expense.id !== expenseId);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    });

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        toggleBtn.textContent = document.body.classList.contains("light-mode")
            ? "Dark Mode"
            : "Light Mode";
    });

    renderExpenses();
    updateTotal();
});
