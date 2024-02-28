if (localStorage.getItem("task-list") == null) {
  var task_list = [];
  var uniqueID = 100;
  var count_incom = 0;
} else {
  var task_list = JSON.parse(localStorage.getItem("task-list"));
  var uniqueID = parseInt(localStorage.getItem("unique-id"));
  var count_incom = parseInt(localStorage.getItem("count"));
}

document
  .getElementById("add-task")
  .addEventListener("submit", function (event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the form fields
    let input = document.getElementById("input-task");
    let name = input.value;
    input.value = "";
    uniqueID = uniqueID + 1;

    let task = {
      id: uniqueID,
      name: name,
      status: false,
    };
    count_incom+=1;
    undone_count = document.getElementById('ts-status');
    undone_count.innerHTML = `<a class="sub-text">${count_incom} tasks left</a>`;

    task_list.push(task);
    localStorage.setItem("task-list", JSON.stringify(task_list));
    localStorage.setItem("unique-id", uniqueID);
    localStorage.setItem("count", count_incom);
    setItem(task_list);
  });

setItem(task_list);

function setItem(data) {
  let task_list = document.getElementById("ts-lst");
  task_list.innerHTML = "";
  data.forEach((element) => {
    if (!element.status) {
      task_list.innerHTML =
        task_list.innerHTML +
        `<div class="task" id="${element.id}">
        <div>
          <a onclick="markDone(${element.id})"><i class="fa-regular fa-square"></i> ${element.name}</a>
        </div>
        <a class="del-btn" onclick="del(${element.id})" ><i class="fa-regular fa-circle-xmark"></i></a>
      </div>`;
    } else {
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
  
  update_count();
}

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
  task_list = task_list.filter((task) => task.id != id);
  task_list.push(given_task);
  localStorage.setItem("task-list", JSON.stringify(task_list));
  count_incom-=1;
  update_count();
}

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
  task_list = task_list.filter((task) => task.id != id);
  task_list.push(given_task);
  localStorage.setItem("task-list", JSON.stringify(task_list));
  count_incom+=1;
  update_count();
}

function del(id) {
  task_list = task_list.filter((task) => task.id != id);
  localStorage.setItem("task-list", JSON.stringify(task_list));
  let task = document.getElementById(`${id}`);
  task.innerHTML = ``;

  count_incom -= 1;
  update_count();
}

function view_all(){
  setItem(task_list);
}

function view_comp(){
  setItem(task_list.filter((task) => task.status != false)); //for complete
}

function view_incomp(){
  setItem(task_list.filter((task) => task.status != true)); //for incomplete
}
  
function comp_all(){
  incomp_tasks=task_list.filter((task) => task.status != true);
  incomp_tasks.forEach((element) => {
    element.status = true;
  });
  setItem(task_list);
  localStorage.setItem("task-list", JSON.stringify(task_list));
  count_incom=0;
  update_count();
}

function clear_all(){
  comp_tasks = task_list.filter((task) => task.status != false);
  comp_tasks.forEach(element => {
    element.status = false;
  });
  setItem(task_list);
  localStorage.setItem("task-list", JSON.stringify(task_list));
  count_incom=task_list.length;
}

function update_count(){
  localStorage.setItem("count", count_incom);
  undone_count = document.getElementById("ts-status");
  undone_count.innerHTML = `<a class="sub-text">${count_incom} tasks left</a>`;
}