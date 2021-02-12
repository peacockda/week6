
// Step 1: Make the world's tiniest to-do app
document.addEventListener('DOMContentLoaded', async function(event) {
  let db = firebase.firestore()
  let todoList = document.querySelector('.todos')

  let form  = document.querySelector('form')
  form.addEventListener('submit', async function(event) {
    event.preventDefault()
    // console.log('To Do submitted')
    todoText = document.querySelector('#todo').value
    let docRef = await db.collection('todos').add({
      text: todoText
    })
    console.log(`Created todo: ${todoText}`)
    if (todoText != ''){
      // Add to this to let me complete a todo I just added
      todoList.insertAdjacentHTML('beforeend', `
        <div class="todo-${docRef.id} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="" class="done p-2 text-sm bg-green-500 text-white">✓</a>
          ${todoText}
        </div>
      `)
      let todoLink = document.querySelector(`.todo-${docRef.id} .done`)
      // console.log(todoLink)
      todoLink.addEventListener('click', async function(event) {
        event.preventDefault()
        // console.log(`${todoData.text} was clicked.`)
        document.querySelector(`.todo-${docRef.id}`).classList.add('opacity-20')
        await db.collection('todos').doc(docRef.id).delete()
    })
      document.querySelector('#todo').value = ''
    }

    console.log(docRef.id)
  })

  // Step 2: Read existing to-dos from Firestore
  let querySnapshot = await db.collection('todos').get()
  // console.log(querySnapshot.size)
  let todos = querySnapshot.docs
  // console.log(todos)
  for (let i = 0; i < todos.length; i++){
    let todo = todos[i]
    // console.log(todo)
    let todoID = todo.id
    // console.log(todoID)
    let todoData = todo.data()
    // console.log(todoData.text)
    todoList.insertAdjacentHTML('beforeend', `
    <div class="todo-${todoID} py-4 text-xl border-b-2 border-purple-500 w-full">
      <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
      ${todoData.text}
    </div>
     `)
    let todoLink = document.querySelector(`.todo-${todoID} .done`)
    // console.log(todoLink)
    todoLink.addEventListener('click', async function(event) {
      // console.log(`${todoData.text} was clicked.`)
      event.preventDefault()
      document.querySelector(`.todo-${todoID}`).classList.add('opacity-20')
      await db.collection('todos').doc(todoID).delete()
    })
  }

  // Step 3: Add code to Step 1 to add todo to Firestore
  // Step 4: Add code to allow completing todos
})