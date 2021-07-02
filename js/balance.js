function start() {
  loginCheck();
  getList();
}

function loginCheck() {
  let status = sessionStorage.getItem('isLoggedIn');
  if (status == 'false') {
    window.open('index.html', '_self');
  }
}

function getList() {
  $.getJSON("http://datiwoods.com/api/transactions", function (data) {
    addList(data.results.reverse());
    console.log(data.results.reverse());
  });
}

function addList(transactions) {
  let html = '';
  transactions.forEach(function (item) {
    if (item.currency === "UAH") {
      html += `<div class="expense-box">
      <div class="expense-pic">
      <div class="expense-pic"></div>
      </div>
      <div class="expense-names">
      <span class="expense-title">${item.title}</span>
      <span class="expense-description">${item.description}</span>
      </div>
      <div class="expense-sum">${item.amount}</div>
    </div>`;
    }
  });
  $("#expense-list").html(html);
}

function exit() {
  sessionStorage.setItem('isLoggedIn', 'false');
  window.open('index.html', '_self');
}