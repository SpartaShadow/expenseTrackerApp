// Main Form
const mainForm = document.getElementById("Main-Form");

// Input fields
const email = document.getElementById("Email-Input");

mainForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (email.value.trim() === "") {
    alert("Please Enter all the fields");
  } else {
    submitForgotPassword();
  }
}

async function submitForgotPassword() {
  const response = await axios.post(
    "http://localhost:4000/password/forgot-password",
    { email: email.value }
  );

  const a = `<a href="${response.data.link}" target="_blank"> Click Here to Reset Password </a>`;
  console.log(a);
}
