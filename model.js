let balance = 0;
let transactions = [];

function addTransaction() {
    let text = document.getElementById('text').value;
    let amount = parseFloat(document.getElementById('amount').value);

    if (text.trim() === '' || isNaN(amount) || amount === 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    const transaction = {
        id: generateID(),
        text,
        amount
    };

    transactions.push(transaction);
    updateBalance();
    updateTransactions();
    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
}

function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

function updateBalance() {
    balance = transactions.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
    document.getElementById('balance').textContent = balance;
}

function updateTransactions() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
        item.innerHTML = `
            ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;
        transactionList.appendChild(item);
    });
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateBalance();
    updateTransactions();
}
