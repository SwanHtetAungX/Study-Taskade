// Get tasks by username
function getTask() {
  var response = "";
  var request = new XMLHttpRequest();
  var username=sessionStorage.getItem("username")
  var accessToken=sessionStorage.getItem("accessToken")
  request.open(
    "GET",
    "https://osqqjxiv0c.execute-api.us-east-1.amazonaws.com/tasks/"+username,
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken
  )
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);

    var html = "";

    for (var i = 0; i < response.Items.length; i++) {
      var totalTask=response.Items.length
      var priorityClass = "low-priority"; // Default class for low priority

      // Update priorityClass based on priority value
      if (response.Items[i].priority === "High") {
        priorityClass = "high-priority";
      } else if (response.Items[i].priority === "Medium") {
        priorityClass = "medium-priority";
      }

      html +=
        '<li class="task-list" id="' +
        response.Items[i].task_id +
        '" onclick="fillTaskDetails(\'' +
        response.Items[i].task_id +
        "')\">" +
        '<input type="checkbox" id="task' +
        (i + 1) +
        '" onclick="toggleCheckBox(event, this, \'' + totalTask + '\')">' +
        '<label for="task' +
        (i + 1) +
        '">' +
        response.Items[i].title +
        "</label>" +
        '<div class="priority ' +
        priorityClass +
        '">' +
        '<i class="fa-solid fa-circle circle-icon ' +
        priorityClass +
        '"></i>' +
        '<span id="priority-text">' +
        response.Items[i].priority +
        "</span>" +
        "</div>" +
        '<div class="due-date">' +
        '<i class="fas fa-calendar-alt calendar-icon"></i>' +
        '<p id="due-at">Due at:</p>' +
        "<span>" +
        response.Items[i].due_date +
        "</span>" +
        "</div>" +
        '<i class="fas fa-trash delete-icon" onclick="deleteTask(\'' +
        response.Items[i].task_id +
        "', event)\"></i>" +
        "</li>";
    }

    if (html != "") document.getElementById("taskList").innerHTML = html;
  };

  request.send();
}
function getSortedTask(sortAttribute, sortOrder) {
  var response = "";
  var request = new XMLHttpRequest();
  var username = sessionStorage.getItem("username");
  var accessToken = sessionStorage.getItem("accessToken");
  var url =
    "https://osqqjxiv0c.execute-api.us-east-1.amazonaws.com/sorted-tasks/" +
    username +
    "?sortAttribute=" + sortAttribute +
    "&sortOrder=" + sortOrder;
  request.open(
    "GET",
    url,
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken
  )
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log('Hi',response);

    var html = "";

    for (var i = 0; i < response.length; i++) {
      var totalTask=response.length
      var priorityClass = "low-priority"; // Default class for low priority

      // Update priorityClass based on priority value
      if (response[i].priority === "High") {
        priorityClass = "high-priority";
      } else if (response[i].priority === "Medium") {
        priorityClass = "medium-priority";
      }

      html +=
        '<li class="task-list" id="' +
        response[i].task_id +
        '" onclick="fillTaskDetails(\'' +
        response[i].task_id +
        "')\">" +
        '<input type="checkbox" id="task' +
        (i + 1) +
        '" onclick="toggleCheckBox(event, this, \'' + totalTask + '\')">' +
        '<label for="task' +
        (i + 1) +
        '">' +
        response[i].title +
        "</label>" +
        '<div class="priority ' +
        priorityClass +
        '">' +
        '<i class="fa-solid fa-circle circle-icon ' +
        priorityClass +
        '"></i>' +
        '<span id="priority-text">' +
        response[i].priority +
        "</span>" +
        "</div>" +
        '<div class="due-date">' +
        '<i class="fas fa-calendar-alt calendar-icon"></i>' +
        '<p id="due-at">Due at:</p>' +
        "<span>" +
        response[i].due_date +
        "</span>" +
        "</div>" +
        '<i class="fas fa-trash delete-icon" onclick="deleteTask(\'' +
        response[i].task_id +
        "', event)\"></i>" +
        "</li>";
    }

    if (html != "") document.getElementById("taskList").innerHTML = html;
  };

  request.send();
}
var completedTask = 0;
function toggleCheckBox(event, checkbox,totalTask) {
  console.log("Mother");
  event.stopPropagation();
  var taskId = checkbox.parentElement.id;
  if (checkbox.checked) {
    document.getElementById(taskId).style.textDecoration = "line-through";
    completedTask+=1
  } else {
    document.getElementById(taskId).style.textDecoration = "none";
    completedTask-=1
  }
  var progressPercentage = totalTask === 0 ? 0 : (completedTask / totalTask) * 100;
  var roundedPercentage = progressPercentage.toFixed(2);
  document.getElementById('percentage').textContent=roundedPercentage+"%";

}
// Add Task
function addTask(taskName, description, resources, deadline, priority) {
  var username=sessionStorage.getItem('username');
  var accessToken=sessionStorage.getItem('accessToken');
  var response = "";
  var jsonData = new Object();
  jsonData.details = description;
  jsonData.due_date = deadline;
  jsonData.priority = priority;
  jsonData.resources = resources;
  jsonData.title = taskName;
  jsonData.username = username;
  var request = new XMLHttpRequest();
  request.open(
    "POST",
    "https://osqqjxiv0c.execute-api.us-east-1.amazonaws.com/tasks",
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken
  );
  request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == "task added successfully") {
      location.reload();
      alert("Task Added Successfully");
    } else {
      console.log(JSON.parse(request.responseText));
    }
  };
  request.send(JSON.stringify(jsonData));
}

function deleteTask(taskId,event) {
  event.stopPropagation();
  var accessToken=sessionStorage.getItem('accessToken');
  var response = "";
  var request = new XMLHttpRequest();
  request.open(
    "DELETE",
    "https://osqqjxiv0c.execute-api.us-east-1.amazonaws.com/tasks/" + taskId,
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken
   
  );
  request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == "task is  deleted successfully") {
      location.reload();
      alert("Task Deleted Successfully");
    } else {
      console.log(response);
    }
  };
  request.send();
}


function fillTaskDetails(task_id) {
  console.log("Hi");
  document.getElementById("modal-1").style.display = "block";
  var closeButton = document.querySelector(".close-1");
  var cancelButton = document.querySelector(".cancel-button-1");
  var taskForm = document.getElementById("taskForm-1");
  cancelButton.addEventListener("click", closeModal);
  closeButton.addEventListener("click", closeModal);
  taskForm.addEventListener("submit", function(event){formSubmit(event,task_id)});
  function closeModal() {
    document.getElementById("modal-1").style.display = "none";
}

var accessToken=sessionStorage.getItem('accessToken');
  var response = "";
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://osqqjxiv0c.execute-api.us-east-1.amazonaws.com/task/" + task_id,
    true
  );
  request.setRequestHeader(
    "Authorization",accessToken 
    
  );
  request.onload = function () {
    response = JSON.parse(request.responseText);
    document.getElementById('taskName-1').value=response.Items[0].title;
    document.getElementById('description-1').value=response.Items[0].details;
    document.getElementById('resources-1').value=response.Items[0].resources;
    document.getElementById('deadline-1').value=response.Items[0].due_date;
    const priorityValue = response.Items[0].priority;
    const radioButtons = document.querySelectorAll('input[name="priority-1"]');

    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].value === priorityValue) {
        radioButtons[i].checked = true;
        break;
      }
    }
    console.log(response);
  };
  request.send();
}
  function formSubmit(event,task_id) {
    event.preventDefault();
    var taskName = document.getElementById("taskName-1").value;
    var description = document.getElementById("description-1").value;
    var resources = document.getElementById("resources-1").value;
    var deadline = document.getElementById("deadline-1").value;
    var priority = document.querySelector('input[name="priority-1"]:checked').value;
    updateTask(task_id,taskName,description,resources,deadline,priority);
    document.getElementById("modal-1").style.display = "none";
    
}

function updateTask(task_id,taskName,description,resources,deadline,priority){
  var username=sessionStorage.getItem('username');
  var accessToken=sessionStorage.getItem('accessToken');
  var response="";
  var jsonData=new Object();
  jsonData.title=taskName;
  jsonData.details=description;
  jsonData.resources=resources;
  jsonData.due_date=deadline;
  jsonData.priority=priority;
  
  jsonData.username=username;
  if(
    jsonData.title=="" ||
    jsonData.details== "" ||
    jsonData.resources== "" ||
    jsonData.priority == ""

  ){
    alert("All fields are required!");
    return;
  }
  var request= new XMLHttpRequest();
  request.open(
    "PUT",
    "https://osqqjxiv0c.execute-api.us-east-1.amazonaws.com/tasks/"+task_id,
    true);
    request.setRequestHeader(
      "Authorization",accessToken
    );
    request.onload=function(){
      response = JSON.parse(request.responseText);
      if(response.message== "Task edited successfully"){
        alert("Task updated successfully")
        location.reload();

      }
      else{
        alert("Error. Unable to update profile.");
      }
    };
    request.send(JSON.stringify(jsonData));

}
function setNav(){
  console.log()
  if (sessionStorage.getItem("idToken") != null) {
    document.getElementById("logOut").style.display = "block";
    document.getElementById("navUser").innerHTML =
      '<a href="user.html"><span class="fa-sharp fa-solid fa-user"></span> Profile</a>';
  } else {
    document.getElementById("logOut").style.display = "none";
  }
}

