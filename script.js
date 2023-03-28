const form = document.querySelector('form')
const output = document.querySelector('.output')
const input = document.querySelector('input[type=text]')
const id = crypto.randomUUID()
let taskArray = []

const tasksLocalStorage = JSON.parse(localStorage.getItem('taskArray'))

if (tasksLocalStorage) {
  taskArray = tasksLocalStorage
  renderList()
}

function renderList() {
  output.innerHTML = ''
  taskArray.forEach(todos => {
    const listElement = createListElement(todos)
    output.append(listElement)
  })
}

const addTask = (e) => {
  e.preventDefault()
  taskArray.push({ id, title: input.value, completed: false })

  localStorage.setItem('taskArray', JSON.stringify(taskArray))
  form.reset()
  renderList()
}

function createListElement(todo) {

  const taskContainer = document.createElement('div')
  taskContainer.classList.add('task-container')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'

  const todoTitle = document.createElement('p')
  todoTitle.innerText = todo.title

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fa-regular', 'fa-circle-xmark')

  taskContainer.appendChild(checkbox)
  taskContainer.appendChild(todoTitle)
  taskContainer.appendChild(deleteIcon)

  return taskContainer
}

form.addEventListener('submit', addTask)

// TBD - Byt ut checkbox mot <i class="fa-solid fa-circle"></i> och <i class="fa-regular fa-circle"></i>




