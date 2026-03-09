document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    let welcomeMsg = document.getElementById('welcomeMsg')

    if (currentUser) {
        welcomeMsg.innerText = `Welcome, ${currentUser.fname}`
    } else {
        window.location.replace('index.html'); // block access
        return;
    }
    document.body.classList.remove('hidden');

    //show logged in user tasks
    // let allTasks = JSON.parse(localStorage.getItem('tasksList'))


    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('currentUser'); // remove logged-in user
        window.location.href = 'index.html'; // redirect to login page
    });
})


let currentUser = JSON.parse(localStorage.getItem('currentUser'))

// console.log(currentUser)
function clearFields() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("dueDate").value = "";

    let radios = document.querySelectorAll('input[name="priority"]');
    radios.forEach(radio => radio.checked = false);

    return false;
}

function addTask() {
    let taskTitle = document.getElementById("taskTitle").value.trim()
    let priorityElement = document.querySelector('input[name="priority"]:checked');
    let priority = priorityElement ? priorityElement.value : "";
    let dueDate = document.getElementById("dueDate").value;

    if (!taskTitle || !priority || !dueDate) {
        alert("Please fill all fields")
        return false
    }

    const task = {
        taskTitle: taskTitle,
        priority: priority,
        dueDate: dueDate,
        username: currentUser.username,
        status: "Pending.."
    }

    let tasksList = JSON.parse(localStorage.getItem('tasksList')) || []

    tasksList.push(task)

    localStorage.setItem('tasksList', JSON.stringify(tasksList))

    alert('Task Added Successfully')
    clearFields()
    showTasks()
    return false;
}

let taskArea = document.getElementById("taskArea")

// let taskData = JSON.parse(localStorage.getItem('tasksList'))
// console.log(userTasks)
let clutter = ""

function showTasks() {
    let allTasks = JSON.parse(localStorage.getItem('tasksList')) || []

    let userTasks = allTasks.filter(task => task.username === currentUser.username);



    let clutter = userTasks.map((data, index) => {
        return `<tr>
        <td>${index + 1}</td>
            <td class="taskTitle">${data.taskTitle}</td>
            <td>${data.priority}</td>
            <td>${data.dueDate}</td>
            <td><i class="ri-delete-bin-7-line deleteBtn"></i><i class="ri-check-line doneBtn" ></i></td> 
            <td class="task_status">${(data.status == 'Done') ? 'Done' : 'Pending..'} </td>
            </tr>`
    }).join('')
    taskArea.innerHTML = clutter

    //  if(userTasks.length==0){
    //     document.querySelector(".noTaskMsg").innerHTML=`<h1>No Tasks...</h1>`
    //     return
    // }


    addDoneEvent()
    deleteTask()
}



// console.log(allTasks)

function addDoneEvent() {
    let doneBtns = document.querySelectorAll(".doneBtn")

    doneBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            let allTasks = JSON.parse(localStorage.getItem('tasksList')) || []
            let statusCell = this.closest("tr").querySelector(".task_status");
            let taskName = this.closest('tr').querySelector(".taskTitle").innerText
            // console.log(taskName)
            let task = allTasks.find(t => t.taskTitle === taskName)
            if (task) {
                task.status = 'Done'
            }
            localStorage.setItem("tasksList", JSON.stringify(allTasks));
            // statusCell.innerText='Done'
            showTasks()

        })
    })
}


function deleteTask() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")

    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            let allTasks = JSON.parse(localStorage.getItem('tasksList')) || []
            let taskName = this.closest('tr').querySelector(".taskTitle").innerText

            allTasks = allTasks.filter(task => task.taskTitle !== taskName)

            localStorage.setItem('tasksList', JSON.stringify(allTasks))

            showTasks()
        })
    })
}

showTasks()

function searchFunctionality() {

    let searchInput = document.getElementById('searchTask')

    searchInput.addEventListener('input', function () {

        if (searchInput.value === "") {
            showTasks()
            return
        }

        let allTasks = JSON.parse(localStorage.getItem('tasksList')) || []
        let userTasks = allTasks.filter(task => task.username === currentUser.username);

        let filteredTasks = userTasks.filter((obj) => obj.taskTitle.toLowerCase().includes(searchInput.value.toLowerCase()))
        // console.log(filteredTasks)
        clutter = filteredTasks.map((data, index) => {
            return `<tr>
        <td>${index + 1}</td>
            <td class="taskTitle">${data.taskTitle}</td>
            <td>${data.priority}</td>
            <td>${data.dueDate}</td>
            <td><i class="ri-delete-bin-7-line deleteBtn"></i><i class="ri-check-line doneBtn" ></i></td> 
            <td class="task_status">${(data.status == 'Done') ? 'Done' : 'Pending..'} </td>
            </tr>`
        }).join('')
        taskArea.innerHTML = clutter
        addDoneEvent()
        deleteTask()
    })

}
searchFunctionality()


function priorityFilter() {

    let checkboxes = document.querySelectorAll('input[name="priority"]:checked')

    let selectedPriorities = Array.from(checkboxes).map(cb => cb.value)

    let allTasks = JSON.parse(localStorage.getItem('tasksList')) || []
    let userTasks = allTasks.filter(task => task.username === currentUser.username);

    // If "All" is selected or nothing selected
    if (selectedPriorities.includes("all") || selectedPriorities.length === 0) {
        showTasks()
        return
    }

    let filteredTasks = userTasks.filter(task =>
        selectedPriorities.includes(task.priority.toLowerCase())
    )

    let rows = filteredTasks.map((data, index) => {
        return `<tr>
            <td>${index + 1}</td>
            <td class="taskTitle">${data.taskTitle}</td>
            <td>${data.priority}</td>
            <td>${data.dueDate}</td>
            <td>
                <i class="ri-delete-bin-7-line deleteBtn"></i>
                <i class="ri-check-line doneBtn"></i>
            </td>
            <td class="task_status">${data.status == 'Done' ? 'Done' : 'Pending..'}</td>
        </tr>`
    }).join("")

    taskArea.innerHTML = rows

    addDoneEvent()
    deleteTask()
}

document.querySelectorAll('input[name="priority"]').forEach(cb => {
    cb.addEventListener("change", priorityFilter)
})