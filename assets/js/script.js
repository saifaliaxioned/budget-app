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
let collection = data ? data : [], editId = null;

const dataLoad = () => {
  if (collection != null) {
    var li = '';
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
      var deleteBtn = document.querySelectorAll('.delete-btn');
      deleteBtn.forEach((delBtn) => {
        delBtn.addEventListener('click', () => {
          var delIndex = delBtn.dataset.del;
          editId = null;
          collection.splice(delIndex, 1);
          localStorage.setItem('itemName', JSON.stringify(collection));
          dataLoad();
        });
      })
    }
    // Edit function
    if (finalResult.children.length != 0) {
      var editBtn = document.querySelectorAll('.edit-btn');
      editBtn.forEach(function (edBtn, ind) {
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
const calculator = (collection) => {
  let priceArr = [];
  let budget = JSON.parse(localStorage.getItem('budget'));
  if (budget != 0) {
    collection.forEach(obj => {
      priceArr.push(parseFloat(obj.amount));
    });
    let expenseSum = priceArr.reduce((a, b) => a + b, 0);
    localStorage.setItem('expenseSum', JSON.stringify(expenseSum));
    budgetValue.innerText = `$ ${budget}`;
    expenseValue.innerText = `$ ${expenseSum}`;
    balanceValue.innerText = `$ ${budget - expenseSum}`;
  }
};
// initial data load
document.load = dataLoad();

budgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('budget', JSON.stringify(+budgetInput.value));
  calculator(collection);
});

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let budget = JSON.parse(localStorage.getItem('budget'));
  let totalExpense = JSON.parse(localStorage.getItem('expenseSum'));
  if (expenseInput.value.trim() != "" && expenseAmtInput.value != "") {
    console.log(budget > totalExpense);
    if(budget > totalExpense){
      newList();
    } else {
      console.log('dont have enough budget');
    }
  } else {
    console.log('please enter budget amount');
  }
});

// new list add function
const newList = () => {

  var dataObj = {
    name: expenseInput.value,
    amount: expenseAmtInput.value,
  }
  if (editId === null) {
    collection.push(dataObj);
  } else {
    collection[editId] = dataObj;
  }
  localStorage.setItem('itemName', JSON.stringify(collection));
  dataLoad();
  expenseInput.value = "";
  expenseAmtInput.value = "";
  editId = null;
}


























