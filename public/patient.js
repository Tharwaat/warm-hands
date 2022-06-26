// //sign up patient
const form = document.querySelector("#form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const conpassword = document.querySelector("#conpassword");
const gender = document.querySelector("#gender");
const birthdate = document.querySelector("#birthdate");
const city = document.querySelector("#city");
const address = document.querySelector("#address");
const illnesscase = document.querySelector("#illnesscase");
const docs = document.querySelector("#docs");
const terms = document.querySelector("#terms");
const submit = document.querySelector("#submit");

form.addEventListener("submit", async (e) => {
  //console.log(e);
  //e.preventDefault();
  console.log(document.getElementById("type").value);
  //await validateInputs();
});

const validateInputs = () => {
  // trim to remove the whitespaces
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const conpasswordValue = conpassword.value.trim();
  const genderValue = gender.value.trim();
  const birthdateValue = birthdate.value.trim();
  const addressValue = address.value.trim();
  const illnesscaseValue = illnesscase.value.trim();
  const docsValue = docs.value.trim();
  const termsValue = terms.value.trim();

  if (firstnameValue === "") {
    setErrorFor(firstname, "First name cannot be empty");
    return false;
  } else {
    setSuccessFor(firstname);
  }
  if (lastnameValue === "") {
    setErrorFor(lastname, "Last name cannot be empty");
    return false;
  } else {
    setSuccessFor(lastname);
  }
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be empty");
    return false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
    return false;
  } else {
    setSuccessFor(email);
  }
  if (phoneValue === "") {
    setErrorFor(phone, "Mobile number cannot be empty");
    return false;
  } else {
    setSuccessFor(phone);
  }
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be empty");
    return false;
  } else {
    setSuccessFor(password);
  }
  if (conpasswordValue === "") {
    setErrorFor(conpassword, "You must confirm password");
    return false;
  } else if (passwordValue !== conpasswordValue) {
    setErrorFor(conpassword, "Passwords does not match");
    return false;
  } else {
    setSuccessFor(conpassword);
  }
  if (birthdateValue === "") {
    setErrorFor(birthdate, "Birth date cannot be empty");
    return false;
  } else {
    setSuccessFor(birthdate);
  }
  if (city ===0) {
    setErrorFor(city, "City cannot be empty");
    return false;
  } else {
    setSuccessFor(city);
  }
  if (addressValue === "") {
    setErrorFor(address, "Address cannot be empty");
    return false;
  } else {
    setSuccessFor(address);
  }
  if (illnesscaseValue === "") {
    setErrorFor(illnesscase, "Illness cannot be empty");
    return false;
  } else {
    setSuccessFor(illnesscase);
  }
  return true;
};
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
