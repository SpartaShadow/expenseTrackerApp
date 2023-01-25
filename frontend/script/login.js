const mainForm = document.getElementById("Main-Form");

// Input fields
const email = document.getElementById("Email-Input");
const password = document.getElementById("Password-Input");

mainForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (email.value === "" || password.value === "") {
    window.alert("Please Enter all the fields");
  } else {
    loginUser();
  }
}

async function loginUser() {
  const userDetails = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:4000/user/login",
      userDetails
    );

    if (response.data.userExists) {
      if (response.data.correctPassword) {
        window.alert("Logged In Successfully");

        popupNotification("Success", "Logged In Succesfully");
      } else {
        window.alert("Wrong Password");
      }
    } else {
      window.alert("User Not Found");
    }
  } catch (err) {
    console.log(err);
  }
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
