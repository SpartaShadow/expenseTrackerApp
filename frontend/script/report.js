const url = "http://localhost:4000";

window.addEventListener("DOMContentLoaded", getExpenses);

const token = localStorage.getItem("token");

const reportDownloadButton = document.getElementById("download-report-button");
reportDownloadButton.addEventListener("click", downloadReport);

const pastLinksButton = document.getElementById("past-links-button");
pastLinksButton.addEventListener("click", getPastLinks);

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

async function downloadReport() {
  try {
    const response = await axios.get(url + "/premium/download-report", {
      headers: { Authorization: token },
    });

    const a = document.createElement("a");

    a.href = response.data.fileUrl;
    a.download = "myexpense.csv";
    a.click();
  } catch (err) {
    console.log(err);
  }
}

async function getPastLinks() {
  try {
    const pastReports = await axios.get(
      "http://localhost:4000/premium/past-reports",
      { headers: { Authorization: token } }
    );

    const aDiv = document.createElement("div");

    aDiv.classList.add("report-links-div");

    pastReports.data.forEach((pastReport) => {
      const a = `<a href="${pastReport.fileUrl}" download class="report-download-links"> ${pastReport.fileName} </a>`;
      aDiv.innerHTML += a;
    });

    console.log(aDiv);
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
