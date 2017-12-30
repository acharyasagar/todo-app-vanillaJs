//Define UI variables

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
}

function addTask(e){
  e.preventDefault();
  if(taskInput.value===''){
    alert('Add a task');
  }

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
  console.log(li);
  //Append the li to ul
  taskList.appendChild(li);

  //Clear Input
  taskInput.value = '';

}
