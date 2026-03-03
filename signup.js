function formHandler() {
    let fname = document.getElementById("fname").value.trim()
    let lname = document.getElementById("lname").value.trim()
    let username = document.getElementById("username").value.trim()
    let password = document.getElementById("password").value.trim()
    let cpassword = document.getElementById("cpassword").value.trim()
    let error = document.getElementById('error')
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9a-zA-Z\s]).{8,32}$/

    error.innerText = "";

    if (fname == '') {
        error.innerText = 'First Name is required'
        return false
    }
    else if (lname == '') {
        error.innerText = 'Last Name is required'
        return false
    }
    else if (username == '') {
        error.innerText = 'Username is required'
        return false
    }
    else if (username.length > 15) {
        error.innerText = 'Username length should be <=15'
        return false
    }
    else if (password == '') {
        error.innerText = 'Password is required'
        return false
    }
    else if (!password.match(regex)) {
        error.innerText = 'Use correct password pattern'
        return false
    }
    else if (cpassword == '') {
        error.innerText = 'Confirm Password is required'
        return false
    }
    else if (password != cpassword) {
        error.innerText = 'Password and Confirm Password should be same'
        return false
    }
    else {
        // 1. Create a user object
        let user = {
            fname: fname,
            lname: lname,
            username: username,
            password: password
        };

        // 2. Save in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // 3. Show success message
        alert('Registered Successfully');

        // 4. Redirect
        window.location.href = 'home.html';

        return false; // prevent default form submission
    }
}