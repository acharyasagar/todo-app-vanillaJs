//Define UI variables and consts

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Event Listeners

loadEventListeners();

function loadEventListeners(){
  //Add tasks event
  form.addEventListener('submit',addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Add event to clear task button
  clearBtn.addEventListener('click', clearTasks);
  //Filter tas event Listener
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
    link.innerHTML= '<i class="fa fa-remove"></i>';
    //Now append the link to the li
    li.appendChild(link);
    //Append the li to ul
    taskList.appendChild(li);

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
