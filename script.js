// condition to check if variable are present in local storage or not
if (localStorage.getItem("task-list") == null) {
  // if variables are not present in local storage
  var task_list = [];
  var uniqueID = 100;
  var count_incom = 0;
} else {
  // if variables are present in local storage
  var task_list = JSON.parse(localStorage.getItem("task-list"));
  var uniqueID = parseInt(localStorage.getItem("unique-id"));
  var count_incom = parseInt(localStorage.getItem("count"));
}

// function to handle add-task buttons function
document
  .getElementById("add-task")
  .addEventListener("submit", function (event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the form fields and store it in variables
    let input = document.getElementById("input-task");
    let name = input.value;
    input.value = ""; //mark input field to empty after task is added
    uniqueID = uniqueID + 1; // unique id for each input

    // declaring new task
    let task = {
      id: uniqueID,
      name: name,
      status: false,
    };

    //hand the values for incomplete tasks
    count_incom+=1;
    undone_count = document.getElementById('ts-status');
    undone_count.innerHTML = `<a class="sub-text">${count_incom} tasks left</a>`;

    task_list.push(task); //add new task to task list array

    //storing all required fields into local storage
    localStorage.setItem("task-list", JSON.stringify(task_list));
    localStorage.setItem("unique-id", uniqueID);
    localStorage.setItem("count", count_incom);

    //listing all items in task list from array
    setItem(task_list);
  });

// listing all items when page get loaded
setItem(task_list);

// function to set items in tasks html tag for a given task list array
function setItem(data) {
  let task_list = document.getElementById("ts-lst");
  task_list.innerHTML = "";

  //traversing each element in data and setting required html codes
  data.forEach((element) => {
    if (!element.status) { 
      // if element is not completed
      task_list.innerHTML =
        task_list.innerHTML +
        `<div class="task" id="${element.id}">
        <div>
          <a onclick="markDone(${element.id})"><i class="fa-regular fa-square"></i> ${element.name}</a>
        </div>
        <a class="del-btn" onclick="del(${element.id})" ><i class="fa-regular fa-circle-xmark"></i></a>
      </div>`;
    } else {
      // if element is completed
      task_list.innerHTML =
        task_list.innerHTML +
        `<div class="task" id="${element.id}">
        <div>
          <a onclick="markInCom(${element.id})"><i class="fa-regular fa-square-check"></i> ${element.name}</a>
        </div>
        <a class="del-btn" onclick="del(${element.id})" ><i class="fa-regular fa-circle-xmark"></i></a>
      </div>`;
    }
  });
  
  update_count(); // updating count after item is set
}

//function when task is marked done
function markDone(id) {
  let given_task = task_list.find((task) => task.id == id);
  let task = document.getElementById(`${id}`);
  if (given_task) {
    given_task.status = true;
    task.innerHTML = ` <div>
        <a onclick="markInCom(${id})"><i class="fa-regular fa-square-check"></i> ${given_task.name}</a>
      </div>
      <a class="del-btn" onclick="del(${id})" ><i class="fa-regular fa-circle-xmark"></i></a>`;
  }

  task_list = task_list.filter((task) => task.id != id); //filtering all tasks which except current task
  task_list.push(given_task); // adding current task with updated status
  localStorage.setItem("task-list", JSON.stringify(task_list)); //updating the status to local storage
  count_incom -= 1;
  update_count();
}

//function when task is marked not-done
function markInCom(id) {
  let given_task = task_list.find((task) => task.id == id);
  let task = document.getElementById(`${id}`);
  if (given_task) {
    given_task.status = false;
    task.innerHTML = ` <div>
        <a onclick="markDone(${id})"><i class="fa-regular fa-square"></i> ${given_task.name}</a>
      </div>
      <a class="del-btn" onclick="del(${id})" ><i class="fa-regular fa-circle-xmark"></i></a>`;
  }
  task_list = task_list.filter((task) => task.id != id); //filtering all tasks which except current task
  task_list.push(given_task); // adding current task with updated status
  localStorage.setItem("task-list", JSON.stringify(task_list)); //updating the status to local storage
  count_incom += 1;
  update_count();
}

//function to delete task
function del(id) {
  // update task list after task is deleted
  task_list = task_list.filter((task) => task.id != id);
  localStorage.setItem("task-list", JSON.stringify(task_list));

  //handle the task view on html page
  let task = document.getElementById(`${id}`);
  task.parentNode.removeChild(task);

  //updating count
  count_incom -= 1;
  update_count();
}

//function to display all tasks
function view_all(){
  setItem(task_list);
}

//function to display completed tasks
function view_comp(){
  setItem(task_list.filter((task) => task.status != false)); //for complete
}

//function to display incompleted tasks
function view_incomp(){
  setItem(task_list.filter((task) => task.status != true)); //for incomplete
}

// function to mark all task as complete
function comp_all(){
  //filter all task which is not completed
  incomp_tasks=task_list.filter((task) => task.status != true);
  // mark all incomplete task as complete
  incomp_tasks.forEach((element) => {
    element.status = true;
  });
  setItem(task_list); // update in local storage
  localStorage.setItem("task-list", JSON.stringify(task_list));
  count_incom=0;
  update_count();
}

//function to mark all task as incomplete
function clear_all(){
  //filter all task which is completed
  comp_tasks = task_list.filter((task) => task.status != false);
  // mark all incomplete task as incomplete
  comp_tasks.forEach((element) => {
    element.status = false;
  });
  setItem(task_list); //update in local storage
  localStorage.setItem("task-list", JSON.stringify(task_list));
  count_incom = task_list.length;
  update_count();
}

//function to update count and also update in local storage and html
function update_count(){
  localStorage.setItem("count", count_incom);
  undone_count = document.getElementById("ts-status");
  undone_count.innerHTML = `<a class="sub-text">${count_incom} tasks left</a>`;
}