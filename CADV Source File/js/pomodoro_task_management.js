function selectTask(taskElement) {
    const taskLabel = taskElement.querySelector("label");
    const taskTitle = taskLabel.textContent;
    const taskDoing = document.getElementById("task-doing");
  
    // Remove border from all tasks
    const allTasks = document.querySelectorAll(".task-list");
    allTasks.forEach((task) => task.style.border = "none");
  
    // Add border to the selected task
    taskElement.style.border = "2px solid red";
  
    // Update the task-doing with the selected task title
    taskDoing.textContent = "#Doing - " + taskTitle;
  }
  
function updatePomodoroTask(task_id,task_name){
    var username=sessionStorage.getItem('username');
    var accessToken=sessionStorage.getItem('accessToken');
    var response=""
    var jsonData= new Object();
    jsonData.username=username
    jsonData.task_name=task_name
    var request= new XMLHttpRequest()
    request.open("PUT",
   "https://703udeutib.execute-api.us-east-1.amazonaws.com/tasks/"+task_id,
   true
    )
    request.setRequestHeader(
        "Authorization",accessToken
       
    );
    request.onload=function(){
        response=JSON.parse(request.responseText)
        if(response.message== "Task edited successfully") {
            alert("Task is edited successfully")
            location.reload();
        }
        else{
            alert('Error. Task cannot be edited ')
            console.log(response)
    }

    };
    request.send(JSON.stringify(jsonData));
}


function showEditTaskModal() {
    document.getElementById("editTaskModal").style.display = "block"; }
function closeEditTaskModal() {
    document.getElementById("editTaskModal").style.display = "none";
      }

function editPomodoroTask(task_id){
    var accessToken=sessionStorage.getItem('accessToken');
    showEditTaskModal()
    var response=""
    var taskName;
    var request= new XMLHttpRequest()
    request.open(
        "GET",
        "https://703udeutib.execute-api.us-east-1.amazonaws.com/task/"+task_id,
        true
    );
    request.setRequestHeader(
        "Authorization",accessToken
       
    );
    request.onload=function(){
        response=JSON.parse(request.responseText);
        console.log(response)
        taskName=response.task_name;
        document.getElementById('taskNameUpdate').value=taskName;
        document.getElementById('updateTaskButton').addEventListener('click', function () {
            var updatedTaskName = document.getElementById('taskNameUpdate').value;
            updatePomodoroTask(task_id, updatedTaskName);
        })
        
    }
    request.send();
    
    
}

function deletePomodoroTask(task_id){
    var username=sessionStorage.getItem('username');
    var accessToken=sessionStorage.getItem('accessToken');
    var response="";
    var request=new XMLHttpRequest();
    var jsonData= new Object();
    jsonData.username=username
    request.open("DELETE",
    "https://703udeutib.execute-api.us-east-1.amazonaws.com/tasks/"+task_id,
    true
    )
    request.setRequestHeader(
        "Authorization",
        accessToken
    );
    request.onload= function(){
        response=JSON.parse(request.responseText)
        if(response.message=="Task is deleted successfully"){
            location.reload();
            alert('Task is deleted successfully')
        }
        else(
            alert('Task cannot be deleted')
        )
    }
    request.send(JSON.stringify(jsonData));


}


function getPomodoroTask() {
    var username=sessionStorage.getItem('username');
    var accessToken=sessionStorage.getItem('accessToken');
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://703udeutib.execute-api.us-east-1.amazonaws.com/tasks/"+username,
      true
    );
    request.setRequestHeader(
      "Authorization",
      accessToken
    );
    request.onload = function () {
      var response = JSON.parse(request.responseText);
      console.log(response);
  
      var html = "";
  
      for (var i = 0; i < response.tasks.length; i++) {
        html +=
          '<li class="task-list" style="color:black;" onclick="selectTask(this)" >' +
          '<label for="task' + (i + 1) + '">' + response.tasks[i].task_name + '</label>' +
          '<i class="fas fa-pen edit-icon" onclick="editPomodoroTask(\'' + response.tasks[i].task_id + '\')"></i>' +
          '<i class="fas fa-trash delete-icon" onclick="deletePomodoroTask(\'' + response.tasks[i].task_id + '\')"></i>' +
          '</li>';
      }
  
      if (html != "") document.getElementById("taskList").innerHTML = html;
    };
    request.send();
  }
  document.addEventListener("DOMContentLoaded", function () {
  function showAddTaskModal() {
    document.getElementById("addTaskModal").style.display = "block";
    
  }
  

  // Function to close the modal
  function closeAddTaskModal() {
    document.getElementById("addTaskModal").style.display = "none";
  }
 

  // Event listener to open the modal when the "+" icon is clicked
  var access_token=sessionStorage.getItem('accessToken')
  if(access_token!=null){
  document.querySelector(".fa-plus").addEventListener("click", showAddTaskModal);}
  else{
    alert("Please Login or Sign Up first")
  }


  // Event listener to close the modal when the close button (X) is clicked
  document.querySelector(".close-button").addEventListener("click", closeAddTaskModal);
document.querySelector(".close-button-1").addEventListener("click", closeEditTaskModal);
  // Event listener to close the modal when the cancel button is clicked
  document.querySelector("#cancelTaskButton").addEventListener("click", closeAddTaskModal);

  // Event listener to save the task when the save button is clicked
  document.querySelector("#saveTaskButton").addEventListener("click", function () {
    var username=sessionStorage.getItem('username');
    var accessToken=sessionStorage.getItem('accessToken');
    const taskName = document.getElementById("taskNameInput").value;
    if (taskName.trim() !== "") {
      var response="";
      var jsonData=new Object();
      jsonData.username=username;
      jsonData.task_name=taskName;

      var request= new XMLHttpRequest();
      request.open("POST",
      "https://703udeutib.execute-api.us-east-1.amazonaws.com/pomodoro-tasks",
      true
      );
      request.setRequestHeader(
        "Authorization",
        accessToken
      );
      request.onload=function(){
        response=JSON.parse(request.responseText);
        if(response.message=='task added successfully'){
            location.reload();
            alert('Task is added successfully');
        }
        else{
            alert('Error. Task cannot be added')
        }

      }
      request.send(JSON.stringify(jsonData));
      
      console.log("New task name:", taskName);
      closeAddTaskModal();
    }
    else{
        alert("Please enter the Task Name")
    }
  });
});