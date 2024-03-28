import "./App.css";
import { useState } from "react";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
  });

  const addTransaction = (event) => {
    event.preventDefault();
    const transactionObj = {
      ...newTransaction,
      id: transactions.length + 1,
    };
    setTransactions(transactions.concat(transactionObj));
    setNewTransaction({ description: "", amount: "" });
  };

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = parseFloat(
    amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);

  const expense = parseFloat(
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc -= item), 0)
  ).toFixed(2);

  const total = parseFloat(income - expense).toFixed(2);

  const handleTextChange = (event) => {
    const copyTrans = {
      ...newTransaction,
      description: event.target.value,
    };

    setNewTransaction(copyTrans);
  };

  const handleAmountChange = (event) => {
    const copyTrans = {
      ...newTransaction,
      amount: parseFloat(event.target.value).toFixed(2),
    };
    setNewTransaction(copyTrans);
  };

  const removeTransaction = (id) => {
    console.log(id);
    const NewTransList = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(NewTransList);
  };

  return (
    <div class="container">
      <h2>Expense Tracker</h2>
      <h4>Your Balance</h4>
      <h1 id="balance">${total} </h1>
      <div class="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" class="money plus">
            +${income}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" class="money minus">
            -${expense}
          </p>
        </div>
      </div>
      <h3>History</h3>
      <ul id="list" class="list">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={transaction.amount > 0 ? "plus" : "minus"}
          >
            {transaction.description} <span>{transaction.amount}</span>{" "}
            <button
              onClick={() => removeTransaction(transaction.id)}
              class="delete-btn"
            ></button>
          </li>
        ))}
      </ul>

      <h3>Add new transaction</h3>
      <form onSubmit={addTransaction}>
        <div class="form-control">
          <label for="text">Text</label>
          <input
            type="text"
            value={newTransaction.description}
            id="text"
            onChange={handleTextChange}
            placeholder="Enter text..."
          />
        </div>

        <label for="amount">
          Amount <br />
          (negative - expense, positive - income)
        </label>
        <input
          type="number"
          value={newTransaction.amount}
          id="amount"
          onChange={handleAmountChange}
          placeholder="Enter amount..."
        />
        {/* </div>*/}
        <button class="btn" type="submit">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default App;
