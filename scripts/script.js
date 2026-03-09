const fields = [
  { id: "username", error: "username_error", name: "Username" },
  { id: "password", error: "password_error", name: "Password" }
];


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


  // GET VALUES
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();


  // GET USERS FROM LOCAL STORAGE
  const users = JSON.parse(localStorage.getItem('users')) || [];


  // FIND USER
  const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
  );


  if (user) {

      // SAVE CURRENT SESSION
      localStorage.setItem('currentUser', JSON.stringify(user));

      alert("Login Successful");

      window.location.href = 'dashboard.html';

      return false;

  } else {

      document.getElementById("password_error").innerText =
      "Invalid username or password";

      return false;
  }
}