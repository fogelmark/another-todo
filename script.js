const form = document.querySelector('form')
const output = document.querySelector('.output')
const id = crypto.randomUUID()
let todosArray = []

let storageInput = JSON.parse(localStorage.getItem('todosArray'))

if (storageInput) {
  todosArray = storageInput
  console.log(todosArray);
}



const addTask = e => {
  e.preventDefault()
  const input = document.querySelector('input[type=text]').value

  todosArray.push({ id, title: input, completed: false })
  
  localStorage.setItem('todosArray', JSON.stringify(todosArray))
  
  console.log(localStorage.getItem('todosArray'));
  form.reset()
}




form.addEventListener('submit', addTask)




