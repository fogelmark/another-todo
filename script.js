const form = document.querySelector('form')
const output = document.querySelector('.output')
const input = document.querySelector('input[type=text]')
const addButton = document.querySelector('.btn-add')
const error = document.querySelector('.error-message')
let taskArray = []

const tasksLocalStorage = JSON.parse(localStorage.getItem('taskArray'))
// console.log(tasksLocalStorage);

// Rendera listan om det finns items i localStorage
if (tasksLocalStorage) {
  taskArray = tasksLocalStorage
  renderList()
}

// Töm listan - Skapa en ett element för varje objekt i taskArray
function renderList() {
  output.innerHTML = ''

  taskArray.forEach(todos => {
    const listElement = createListElement(todos)
    output.append(listElement)
  })
}

// Bygg ihop en taskContainer med checkbox, title och deleteIcon
function createListElement(todo) {

  const taskContainer = document.createElement('div')
  taskContainer.classList.add('task-container')
  taskContainer.id = todo.id

  const checkbox = document.createElement('i')
  checkbox.classList.add('fi-xtluxl-square-checkbox-wide', 'task-checkbox')

  const task = document.createElement('p')
  task.classList.add('task-title')
  task.innerText = todo.title
  task.id = todo.id

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fi-xnsuxl-trash-bin')
  deleteIcon.id = todo.id

  if (todo.completed === true) {
    task.classList.add('strike')
    checkbox.classList.add('fi-xwluxl-square-checkbox-checked-wide')
  }
 
  taskContainer.appendChild(checkbox)
  taskContainer.appendChild(task)
  taskContainer.appendChild(deleteIcon)
  
  return taskContainer
}

const addTask = (e) => {
  e.preventDefault()

  if (input.value.trim() === '') {
    error.classList.remove('hidden')
    return
  }

  const newTask = ({
    id: crypto.randomUUID(), 
    title: input.value, 
    completed: false
  })

  taskArray.push(newTask)
  localStorage.setItem('taskArray', JSON.stringify(taskArray))
  error.classList.add('hidden')
  form.reset()
  renderList(taskArray)
  friconix_update()
}

const deleteTask = e => {
  
  if (e.target.classList.contains('fi-xnsuxl-trash-bin')) {
    e.target.parentElement.remove()
    const taskIndex = taskArray.findIndex(task => task.id == e.target.id)
    taskArray.splice(taskIndex, 1)
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
  }
}

function updateStatus(e) {
    
    if (e.target.nodeName === 'DIV') {
      e.target.querySelector('.task-title').classList.toggle('strike')
      e.target.querySelector('.task-checkbox').classList.toggle('fi-xwluxl-square-checkbox-checked-wide')

      const taskIndex = taskArray.findIndex(task => task.id == e.target.id)
      taskArray[taskIndex].completed = taskArray[taskIndex].completed ? false : true
      
      localStorage.setItem('taskArray', JSON.stringify(taskArray))
      friconix_update()
    }

}

output.addEventListener('click', deleteTask)
output.addEventListener('click', updateStatus)
form.addEventListener('submit', addTask)



