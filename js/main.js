let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".addOne");
console.log(deleteAll);
let arrayOfTasks = [];
if (localStorage.getItem("tasks") != null) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// click on task Element
// deleteall.addEventListener("click",(e)=>{
//     //  localStorage.removeItem(key);

// })


// deleteall.onclick

deleteAll.onclick = function () {
 
  localStorage.removeItem('tasks');
  tasksDiv.innerHTML = ''; 
  document.getElementById("addOne").style.color = "red";
};

//  deleteAll.addEventListener("click",(e) => {
//    // delete Button
//     document.getElementById("addOne").style.color = "red";
//   //  if (e.target.classList.contains("addOne")) {
//      // remove task From localStorage
//      // 1 create function name
//     //  deleteTaskwith(e.target("tasks"));
//      // Remove Element Frome page
//     //  e.target.remove();
//   //  }
//  });




// }
 tasksDiv.addEventListener("click", (e) => {
  // delete Button
  if (e.target.classList.contains("del")) {
    // remove task From localStorage
    // 1 create function name
    deleteTaskwith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element Frome page
    e.target.parentElement.remove();
  }
  // task Element
  if (e.target.classList.contains("task")) {
    // toggle completed the task
    togglestatusTAskWith(e.target.getAttribute("data-id"));
    // toggle done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // created class as opjects
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push task to array of taske
  arrayOfTasks.push(task);
  // console.log(task);
  // baild function
  //  //  // add taskes to page
  addElementsToPageFrom(arrayOfTasks);
  // add task to localStorage
  addDataToLocalStoragefrom(arrayOfTasks);
  //  console.log(arrayOfTasks)
  //  console.log(JSON.stringify(arrayOfTasks))
}
// 3 steep

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    // create main Div
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // console.log(div);
    // create delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    // append Button to main div
    div.appendChild(span);
    // console.log(div);
    // add taskes div container
    tasksDiv.appendChild(div);
  });
}
// build fun to bauild localStorage1
function addDataToLocalStoragefrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
    // console.log(tasks);
  }
}
function deleteTaskwith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStoragefrom(arrayOfTasks);
}
function togglestatusTAskWith(taskId) {
  // For Explain Only
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStoragefrom(arrayOfTasks);
}

