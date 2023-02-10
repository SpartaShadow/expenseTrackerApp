const mainForm = document.getElementById("Main-Form");

// Input fields
const email = document.getElementById("Email-Input");
const password = document.getElementById("Password-Input");

mainForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (email.value.trim() === "" || password.value.trim() === "") {
    alert("Please Enter all the fields");
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
    localStorage.setItem("token", response.data.token);
    location.href = "../views/expense.html";
  } catch (err) {
    {
      if (err.response.status === 401) {
        alert("Login failed, Wrong Password");
      }

      if (err.response.status === 404) {
        alert("Login failed, User Not Found");
      }
    }
  }
}
