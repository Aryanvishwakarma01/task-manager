const fields = [
  { id: "fname", error: "fname_error", name: "First Name" },
  { id: "lname", error: "lname_error", name: "Last Name" },
  { id: "username", error: "username_error", name: "Username" },
  { id: "password", error: "password_error", name: "Password" },
  { id: "cpassword", error: "cpassword_error", name: "Confirm Password" }
];

const passwordRegex =
/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9a-zA-Z\s]).{8,32}$/;


// REAL TIME VALIDATION
fields.forEach(field => {
  document.getElementById(field.id).addEventListener("input", () => {
    validateField(field);
  });
});


function validateField(field){

  let value = document.getElementById(field.id).value.trim();
  let error = document.getElementById(field.error);

  if(value === ""){
    error.innerText = `${field.name} is required`;
    return false;
  }

  error.innerText = "";
  return true;
}


function formHandler(){

  let isValid = true;

  // REQUIRED FIELD VALIDATION
  fields.forEach(field => {
    if(!validateField(field)){
      isValid = false;
    }
  });

  if(!isValid) return false;

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let cpassword = document.getElementById("cpassword").value.trim();

  // USERNAME LENGTH
  if(username.length > 15){
    document.getElementById("username_error").innerText =
    "Username must be <= 15 characters";
    return false;
  }

  // PASSWORD REGEX
  if(!passwordRegex.test(password)){
    document.getElementById("password_error").innerText =
    "Password must contain uppercase, lowercase, number & special character";
    return false;
  }

  // PASSWORD MATCH
  if(password !== cpassword){
    document.getElementById("cpassword_error").innerText =
    "Passwords do not match";
    return false;
  }

  // LOCAL STORAGE USERS
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if(users.some(u => u.username.toLowerCase() === username.toLowerCase())){
    document.getElementById("username_error").innerText =
    "Username already exists";
    return false;
  }

  users.push({
    fname: document.getElementById("fname").value.trim(),
    lname: document.getElementById("lname").value.trim(),
    username,
    password
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully");

  window.location.href = "dashboard.html";

  return false;
}