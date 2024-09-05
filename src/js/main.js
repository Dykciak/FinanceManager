let incomeSection;
let expensesSection;
let avaibleMoney;
let addTransactionPanel;
// --------------------
let nameInput;
let amountInput;
let categorySelect;
// --------------------
let addTransactionBtn;
let saveBtn;
let cancelBtn;
let deleteBtn;
let deleteAllBtn;
// --------------------
let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
// --------------------
let lightStyleBtn;
let darkStyleBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	incomeSection = document.querySelector(".income-area");
	expensesSection = document.querySelector(".expenses-area");
	avaibleMoney = document.querySelector(".avaible-money");
	addTransactionPanel = document.querySelector(".add-transaction-panel");
	// --------------------
	nameInput = document.querySelector("#name");
	amountInput = document.querySelector("#amount");
	categorySelect = document.querySelector("#category");
	// --------------------
	addTransactionBtn = document.querySelector(".add-transaction");
	saveBtn = document.querySelector(".save");
	cancelBtn = document.querySelector(".cancel");
	deleteBtn = document.querySelector(".delete");
	deleteAllBtn = document.querySelector(".delete-all");
	// --------------------
	lightStyleBtn = document.querySelector(".light");
	darkStyleBtn = document.querySelector(".dark");
};

const prepareDOMEvents = () => {
	addTransactionBtn.addEventListener("click", showPanel);
	cancelBtn.addEventListener("click", closePanel);
	saveBtn.addEventListener("click", checkForm);
	cancelBtn.addEventListener("click", clearInputs);
	deleteAllBtn.addEventListener("click", deleteAllTransactions);
	lightStyleBtn.addEventListener("click", changeStyleToLight);
	darkStyleBtn.addEventListener("click", changeStyleToDark);
};

// ----------------first function--------------
const showPanel = () => {
	addTransactionPanel.style.display = "flex";
};
// ---------------second function--------------

const closePanel = () => {
	addTransactionPanel.style.display = "none";
};
// ---------------third function---------------

const checkForm = () => {
	if (
		nameInput.value !== "" &&
		amountInput.value !== "" &&
		categorySelect.value !== "none"
	) {
		createNewTransaction();
	} else {
		alert("Wypełnij wszystkie pola!");
	}
};
// ---------------fourth function---------------

const clearInputs = () => {
	nameInput.value = "";
	amountInput.value = "";
	categorySelect.selectedIndex = 0;
};

// ---------------fiveth function---------------
const createNewTransaction = () => {
	const newTransaction = document.createElement("div");
	newTransaction.classList.add("transaction");
	newTransaction.setAttribute("id", ID);
	checkCategory(selectedCategory);
	newTransaction.innerHTML = `							
	<p class="transaction-name">
	${categoryIcon} ${nameInput.value}
	</p>
	<p class="transaction-amount">
	$${amountInput.value}
	<button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
	</p>`;

	if (amountInput.value > 0) {
		incomeSection.append(newTransaction);
		newTransaction.classList.add("income");
	} else {
		expensesSection.append(newTransaction);
		newTransaction.classList.add("expense");
	}

	moneyArr.push(parseFloat(amountInput.value));
	countMoney(moneyArr);
	closePanel();
	ID++;
	clearInputs();
};

// ---------------sixth function---------------
const checkCategory = (transaction) => {
	switch (transaction) {
		case "[ + ] income":
			categoryIcon = '<i class="fas fa-money-bill-wave"></i> ';
			break;
		case "[ - ] shopping":
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case "[ - ] food":
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;
		case "[ - ] enterteiment":
			categoryIcon = '<i class="fas fa-film"></i>  ';
			break;
		case "[ - ] other":
			categoryIcon = '<i class="fa-solid fa-question"></i> ';
			break;
	}
};

// ---------------seventh function---------------
const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};
// ---------------eighth function---------------

const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b);
	avaibleMoney.textContent = `$${newMoney}`;
};

// ---------------nineth function---------------

const deleteTransaction = (id) => {
	console.log("kutas");
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);

	moneyArr.splice(indexOfTransaction, 1);
	transactionToDelete.classList.contains("income")
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete);
	countMoney(moneyArr);
};
// ---------------tenth function---------------
const deleteAllTransactions = () => {
	incomeSection.innerHTML = "<h3>Income:</h3>";
	expensesSection.innerHTML = "<h3>Expenses:</h3>";
	avaibleMoney.textContent = "$0";
	moneyArr = [0];
};

// ---------------eleventh function---------------

const changeStyleToLight = () => {
	root.style.setProperty("--light-color", "#f9f9f9");
	root.style.setProperty("--dark-color", "#14161f");
	root.style.setProperty("--border-color", "#0003");
};

// ---------------twelfth function---------------
const changeStyleToDark = () => {
	root.style.setProperty("--dark-color", "#f9f9f9");
	root.style.setProperty("--light-color", "#14161f");
	root.style.setProperty("--border-color", "#fff3");
};

document.addEventListener("DOMContentLoaded", main);
