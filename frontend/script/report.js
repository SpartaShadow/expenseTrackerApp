window.addEventListener("DOMContentLoaded", getExpenses);

const token = localStorage.getItem("token");

async function getExpenses() {
  try {
    const response = await axios.get(
      "http://localhost:4000/expenses/get-expenses",
      { headers: { Authorization: token } }
    );

    response.data.expenses.forEach((expense) => {
      createTable(expense);
    });
  } catch (err) {
    console.log(err);
  }
}

function createTable(expense) {
  const reportTable = document.getElementById("report-table");

  const tr = `<tr>
            <td> ${expense.createdAt} </td>
            <td> ${expense.expenseAmount} </td>
            <td> ${expense.description} </td>
            <td> ${expense.category} </td>
        </tr>`;

  reportTable.innerHTML += tr;
}
