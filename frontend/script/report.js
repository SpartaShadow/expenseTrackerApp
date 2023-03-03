const url = "http://localhost:4000";

const token = localStorage.getItem("token");

// Variable Declarations
const reportTable = document.getElementById("report-table");

window.addEventListener("DOMContentLoaded", () => {
  getExpenses(1);
});

const reportDownloadButton = document.getElementById("download-report-button");
reportDownloadButton.addEventListener("click", downloadReport);

const pastLinksButton = document.getElementById("past-links-button");
pastLinksButton.addEventListener("click", getPastLinks);

async function getExpenses(pageNumber) {
  try {
    reportTable.innerHTML = `<tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
             </tr>`;
    const response = await axios.get(
      "http://localhost:4000/expenses/get-expenses?page=" + pageNumber,
      { headers: { Authorization: token } }
    );

    response.data.expenses.forEach((expense) => {
      createTable(expense);
    });
    pagination(response.data);
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
  const tr = `<tr>
            <td> ${expense.createdAt} </td>
            <td> ${expense.expenseAmount} </td>
            <td> ${expense.description} </td>
            <td> ${expense.category} </td>
        </tr>`;

  reportTable.innerHTML += tr;
}

function pagination(data) {
  const pageButtonsDiv = document.getElementById("page-buttons-div");

  // Clearing existing buttons
  pageButtonsDiv.innerHTML = "";

  // Creating the previous Button if it exists
  if (data.hasPreviousPage) {
    const prevButton = document.createElement("button");

    prevButton.innerHTML = data.previousPage;

    prevButton.classList.add("page-buttons");

    prevButton.addEventListener("click", () => {
      getExpenses(data.previousPage);
    });

    pageButtonsDiv.appendChild(prevButton);
  }

  const currentButton = document.createElement("button");

  currentButton.innerHTML = data.currentPage;

  currentButton.classList.add("page-buttons");
  currentButton.classList.toggle("active");

  currentButton.addEventListener("click", () => {
    getExpenses(data.currentPage);
  });

  pageButtonsDiv.appendChild(currentButton);

  // Creating the next button if it exists
  if (data.hasNextPage) {
    const nextButton = document.createElement("button");

    nextButton.innerHTML = data.nextPage;

    nextButton.classList.add("page-buttons");

    nextButton.addEventListener("click", () => {
      getExpenses(data.nextPage);
    });

    pageButtonsDiv.appendChild(nextButton);
  }
}
