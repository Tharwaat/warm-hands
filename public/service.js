// //sign up service
const forms = document.querySelector("#forms");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const conpassword = document.querySelector("#conpassword");
const gender = document.querySelector("#gender");
const birthdate = document.querySelector("#birthdate");
const city = document.querySelector("#city");
const experience = document.querySelector("#experience");
const rate = document.querySelector("#rate");
const docs = document.querySelector("#docs");
const terms = document.querySelector("#terms");
const submit = document.querySelector("#submit");

forms.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(document.getElementById("type").value);
  const isValid = validateInputs();
  console.log(isValid);
  if (isValid) document.getElementById("forms").submit();
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
  if (experience ===0) {
    setErrorFor(experience, "Experience cannot be empty");
    return false;
  } else {
    setSuccessFor(experience);
  }
  
  if (rate ===0) {
    setErrorFor(rate, "Rate cannot be empty");
    return false;
  } else {
    setSuccessFor(rate);
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
