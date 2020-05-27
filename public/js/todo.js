//Define UI variables and consts

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Event Listeners

loadEventListeners();

function loadEventListeners(){

  //DOM load Event
  document.addEventListener('DOMContentLoaded', pullTasks);
  //Add tasks event
  form.addEventListener('submit',addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Add event to clear task button
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event Listener
  filter.addEventListener('keyup', filterTasks);

}

function addTask(e){
  e.preventDefault();
  //Check input and alert if its empty
  if(taskInput.value === ''){

  alert('Add a task');
  }
  //If its not empty, add its value to the list
  else{

    //Create li element
    const li = document.createElement('li');
    //Add class to the li element
    li.className='collection-item';
    //Create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class to the link element
    link.className='delete-item secondary-content';
    //Add icon to the link
    link.innerHTML= '<i class="small material-icons">delete_forever</i>';
    //Now append the link to the li
    li.appendChild(link);
    //Append the li to ul
    taskList.appendChild(li);

    //store in local localstorage
    storeTasks(taskInput.value);

    //Clear Input
    taskInput.value = '';

  }
}
//Removetask function
function removeTask(e){
  //Uses Event delegation to target the i tag
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      //removes the parent (li) of parent (a) tag
      removeTaskFromLS(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
    }
  }
}

//Function clearTasks

function clearTasks(e){
  if(confirm('Are you sure you want to clear all tasks?')){
      //taskList.innerHTML = ''; -- one way
      //removing child using while loop
      while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
        localStorage.clear();
      }
  }
}

//FilterTasks Function

function filterTasks(e){

  //gets the search string and converts it into lowercase
  const text = e.target.value.toLowerCase();

  //forEach loops through all text nodes returned by queryselector
  document.querySelectorAll('.collection-item').forEach(function(task){
    // gets the text content of the li item and converts it into lowercase and matches the index of search string
    if(task.firstChild.textContent.toLowerCase().indexOf(text)!= -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

//Persist the tasks to the localstorage

function storeTasks(task){
  let tasks;
  //check if localstorage already has tasks array
  if(localStorage.getItem('tasks') === null){
    //initialize an empty array
    tasks = [];

  } else {
    // Getting items from the array (tasks) in localstorage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  //set new tasks array after pushing the task to tasks array
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Pull Tasks from the local storage and render them

function pullTasks(){
  let tasks;
  //check if localstorage already has tasks array
  if(localStorage.getItem('tasks') === null){
    //initialize an empty array
    tasks = [];

  } else {
    // Getting items from the array (tasks) in localstorage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    //Add class to the li element
    li.className='collection-item';
    //Create textnode with task  and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class to the link element
    link.className='delete-item secondary-content';
    //Add icon to the link
    link.innerHTML= '<i class="small material-icons">delete_forever</i>';
    //Now append the link to the li
    li.appendChild(link);
    //Append the li to ul
    taskList.appendChild(li);
  })
}

//Remove tasks from local storage

function removeTaskFromLS(taskItem){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(function(task,index){
    if(task === taskItem.textContent){
      tasks.splice(index,1)
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
