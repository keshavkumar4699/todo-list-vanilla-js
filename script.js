if (localStorage.getItem("task-list") == null) {
  var task_list = [];
} else {
  var task_list = JSON.parse(localStorage.getItem("task-list"));
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

    let task = {
      name: name,
      status: false,
    };

    task_list.push(task);
    localStorage.setItem("task-list", JSON.stringify(task_list));
  });

setItem(task_list);

function setItem(data) {
  let task_list = document.getElementById("ts-lst");
  task_list.innerHTML = "";
  data.forEach((element) => {
    task_list.innerHTML =
      task_list.innerHTML +
      `<div class="task">
        <div>
          <a><i class="fa-regular fa-square"></i> ${element.name}</a>
        </div>
        <a class="del-btn"><i class="fa-regular fa-circle-xmark"></i></a>
      </div>`;
  });
}
