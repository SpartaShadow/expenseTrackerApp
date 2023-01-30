// Main Form
const mainForm = document.getElementById("Main-Form");

// Three input fields
const expenseAmount = document.getElementById("Expense-Amount-Input");
const description = document.getElementById("Description-Input");
const category = document.getElementById("Category-Input");

// Main Display List
const mainList = document.getElementById("Main-List");

// Edit true or false var
let edit = [false, ""];

/*
 * ------ Event Listeners ------
 */

window.addEventListener("DOMContentLoaded", retrieveFromDatabase);

mainForm.addEventListener("submit", onSubmit);

/*
 * ------ Event Functions ------
 */

function onSubmit(e) {
  e.preventDefault();

  if (
    expenseAmount.value.trim() === "" ||
    description.value.trim() === "" ||
    category.value.trim() === ""
  ) {
    popupNotification("Error", "Please Enter All The Fields");
  } else if (edit[0]) {
    // Editing the existing details
    editToDatabase(edit[1]);

    // Clearing the fields
    clearFields();
  } else {
    // Storing to local Storage and creating new list
    storeToDatabase();

    // Clearing the fields
    clearFields();
  }
}

async function editItem(e) {
  e.preventDefault();

  // Accessing the list
  let li = e.target.parentElement;
  let url = "http://localhost:4000/expenses/edit-expense/" + li.id;

  try {
    let response = await axios.get(url);
    // Changing input values to the list values
    expenseAmount.value = response.data.expenseAmount;
    description.value = response.data.description;
    category.value = response.data.category;

    // Removing the list
    mainList.removeChild(li);

    // Changing edit variable
    edit = [true, url];
  } catch (err) {
    console.log(err);
  }
}

async function deleteItem(e) {
  e.preventDefault();

  // Accessing the list
  let li = e.target.parentElement;

  let url = "http://localhost:4000/expenses/delete-expense/" + li.id;

  try {
    await axios.post(url);

    // Removing From screen
    mainList.removeChild(li);
  } catch (err) {}
}

/*
 * ------ Storing, Editing and Retrieving Functions ------
 */

async function storeToDatabase() {
  // Storing expense details in an object
  let expenseDetails = {
    expenseAmount: expenseAmount.value,
    description: description.value,
    category: category.value,
  };

  // Storing to crud crud
  try {
    let response = await axios.post(
      "http://localhost:4000/expenses/add-expense",
      expenseDetails
    );

    createList(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function retrieveFromDatabase() {
  try {
    let response = await axios.get(
      "http://localhost:4000/expenses/get-expenses"
    );

    response.data.forEach((data) => {
      createList(data);
    });
  } catch (err) {
    console.log(err);
  }
}

async function editToDatabase(url) {
  // Making new Object
  let expenseDetails = {
    expenseAmount: expenseAmount.value,
    description: description.value,
    category: category.value,
  };

  // Making edit false for next user
  edit = [false, ""];

  try {
    await axios.post(url, expenseDetails);

    let response = await axios.get(url);
    createList(response.data);
  } catch (err) {
    console.log(err);
  }
}

/*
 * ------ Create Functions ------
 */

function createList(data) {
  // Creating an empty li
  let li = document.createElement("li");

  // Creating edit and delete buttons;
  let editButton = createEditButton();
  let deleteButton = createDeleteButton();

  // Assinging the description as id for list
  li.id = data.id;
  li.className = "Expense-List";
  // Adding text to the list
  li.append(
    document.createTextNode(
      `${data.expenseAmount} - ${data.description} - ${data.category}`
    )
  );

  // Adding edit and delete buttons to the list
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  // Adding the list to the main list
  mainList.appendChild(li);
}

function createEditButton() {
  // Creating the button
  let editButton = document.createElement("button");

  // Adding Class Name
  editButton.className = "Edit-Button";

  // Adding event listener
  editButton.onclick = editItem;
  // Adding Text
  editButton.append(document.createTextNode("Edit Expense"));

  return editButton;
}

function createDeleteButton() {
  // Creating the button
  let deleteButton = document.createElement("button");

  // Adding class to the button
  deleteButton.className = "Delete-Button";

  // Adding event listener
  deleteButton.onclick = deleteItem;

  // Adding Text to the button
  deleteButton.append(document.createTextNode("Delete Expense"));

  return deleteButton;
}

/*
 * --- Other Functions ---
 */
function clearFields() {
  expenseAmount.value = "";
  description.value = "";
}

const close = document.getElementById("close");
const popupContainer = document.getElementById("popup-container");
const popupInnerDiv = document.getElementById("popup-inner-div");

close.addEventListener("click", closePopup);

function closePopup() {
  popupContainer.classList.remove("active");

  const childNodes = popupInnerDiv.children;

  popupInnerDiv.removeChild(childNodes[1]);
  popupInnerDiv.removeChild(childNodes[1]);
}

function popupNotification(title, message) {
  popupContainer.classList.add("active");

  const headingH1 = document.createElement("h1");
  headingH1.append(document.createTextNode(title));

  const innerMessage = document.createElement("p");
  innerMessage.append(document.createTextNode(message));

  // <h1>Success</h1>
  // <p>${message}</p>

  popupInnerDiv.appendChild(headingH1);
  popupInnerDiv.appendChild(innerMessage);
}
