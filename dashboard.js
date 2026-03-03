let user = JSON.parse(localStorage.getItem('user'))

let welcomeMsg = document.getElementById('welcomeMsg')

if (user) {
    welcomeMsg.innerText(`Welcome, ${user.fname}`)
}else {
    window.location.href('index.html')
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('user'); // remove logged-in user
    window.location.href = 'index.html'; // redirect to login page
});