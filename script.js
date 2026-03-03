function formHandler() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        console.log(storedUser.username); // "johndoe"
        console.log(storedUser.password); // "Password@123"
    }

    if (username === 'admin' && password === 'admin') {
        window.location.href = "home.html";
        return false; // prevent default form submission
    } else if(username==storedUser.username && password==storedUser.password){
        window.location.href = "home.html";
        return false; // prevent default form submission
    } else {
        alert("Invalid username or password");
        return false; // stop form submission
    }
}