const mainForm = document.getElementById("Main-Form");

const username = document.getElementById("Username-Input");
const email = document.getElementById("Email-Input");
const password = document.getElementById("Password-Input");
mainForm.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();
  if (username.value === "" || email.value === "" || password.value === "") {
    window.alert("Please Enter all the fields");
  } else {
    storeUserToDatabase();
  }
}
async function storeUserToDatabase() {
  const userDetails = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:4000/user/add-user",
      userDetails
    );

    if (response.data.alreadyExisting) {
      window.alert("Email Already Exists");
    } else {
    }
  } catch (err) {
    console.log(err);
  }
}
