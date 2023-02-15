const budgetInput = document.querySelector('.budget-amount'),
  expenseInput = document.querySelector('.expense-name'),
  expenseAmtInput = document.querySelector('.expense-amount'),
  budgetForm = document.querySelector('.budget-form'),
  expenseForm = document.querySelector('.expense-form'),
  finalResult = document.querySelector('.final-result'),
  budgetPrice = document.querySelector('.budget-price'),
  budgetValue = document.querySelector('.budget-value'),
  expenseValue = document.querySelector('.expense-value'),
  balanceValue = document.querySelector('.balance-value');

let data = JSON.parse(localStorage.getItem('itemName'));
let collection = data ? data : [], editId = null,isvalid;
let budget = JSON.parse(localStorage.getItem('budget'));
budgetInput.value = budget;

// function to add new list of expenses
const newList = () => {
  const dataObj = {
    name: expenseInput.value,
    amount: expenseAmtInput.value,
  }
  if (editId === null) {
    collection.push(dataObj);
  } else {
    collection[editId] = dataObj;
    editId = null;
  }
  localStorage.setItem('itemName', JSON.stringify(collection));
  dataLoad();
  expenseInput.value = "";
  expenseAmtInput.value = "";
};
// function to create list of expense
const dataLoad = () => {
  if (collection != null) {
    let li = '';
    collection.forEach((list, index) => {
      li += ` <li class="data-list">
      <ul class="item-store">
                <li class="store-list result-name">${list.name}</li>
                <li class="store-list result-amount">${list.amount}</li>
                <li class="store-list">
                  <ul class="controls">
                    <li><a href="#FIXME" class="edit-btn" title="Edit">edit</a></li>
                    <li><a href="#FIXME" class="delete-btn" data-del="${index}" title="Delete">delete</a></li>
                  </ul>
                </li>
              </ul>
              </li>`;
    });
    finalResult.innerHTML = li;
    calculator(collection);
    // Delete function
    if (finalResult.children.length != 0) {
      const deleteBtn = document.querySelectorAll('.delete-btn');
      deleteBtn.forEach((delBtn) => {
        delBtn.addEventListener('click', () => {
          const delIndex = delBtn.dataset.del;
          const prevobj = collection[editId];
          collection.splice(delIndex, 1);
          editId = collection.indexOf(prevobj);
          localStorage.setItem('itemName', JSON.stringify(collection));
          dataLoad();
        });
      })
    }
    // Edit function
    if (finalResult.children.length != 0) {
      let editBtn = document.querySelectorAll('.edit-btn');
      editBtn.forEach((edBtn, ind) => {
        edBtn.addEventListener('click', () => {
          const resultName = document.querySelectorAll('.result-name');
          const resultAmount = document.querySelectorAll('.result-amount');
          editId = ind;
          expenseInput.value = resultName[ind].innerText;
          expenseAmtInput.value = resultAmount[ind].innerText;
        })
      })
    };
  }
};
// function to calculate expenses and budget
const calculator = (collection) => {
  let priceArr = [];
  let getBudget = JSON.parse(localStorage.getItem('budget'));
  collection.forEach(obj => {
    priceArr.push(parseFloat(obj.amount));
  });
  if (getBudget != null) {
    let expenseSum = priceArr.reduce((a, b) => a + b, 0);
    localStorage.setItem('expenseSum', JSON.stringify(expenseSum));
    budgetValue.innerText = `$ ${getBudget}`;
    expenseValue.innerText = `$ ${expenseSum}`;
    balanceValue.innerText = `$ ${getBudget - expenseSum}`;
  }
};
// function to create errors
const createError = (input, errorMsg) => {
  const inputGroup = input.parentElement,
    error = document.createElement("span");
  error.className = "error";
  error.innerText = errorMsg;
  inputGroup.appendChild(error);
};
// function to validate inputs
const inputValidation = (input) => {
  const activeError = input.parentElement.querySelector(".error");
    isvalid = true;
  if (activeError) {
    activeError.remove();
  }
  if (!input.value) {
    createError(input, "*field is required");
    return isvalid = false;
  } else {
    return isvalid;
  }
};
// event to add budget
budgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  inputValidation(budgetInput);
  let errorGet = document.querySelectorAll(".error");
  if (isvalid == true && errorGet.length === 0) {
    localStorage.setItem('budget', JSON.stringify(+budgetInput.value));
    calculator(collection);
  }
});
// event to add expenses
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let budget = JSON.parse(localStorage.getItem('budget'));
  inputValidation(budgetInput);
  inputValidation(expenseInput);
  inputValidation(expenseAmtInput);
  let errorGet = document.querySelectorAll(".error");
  if (isvalid == true && errorGet.length === 0 && (budget != 0) && (budget != null)) {
    newList();
  };
});
// initial data load
document.load = dataLoad();



























