document.addEventListener('DOMContentLoaded', async function(event) {
  
  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app
  document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault()

    let todoText = document.querySelector('#todo').value

    if (todoText.length > 0) {
      let docRef = await db.collection('todos').add({
        text: todoText
      })

      let todoId = docRef.id
      console.log(`new todo with ID ${todoId} created`)

      document.querySelector('.todos').insertAdjacentHTML('beforeend', `
        <div class="todo-${todoId} py-4 text-xl border-b-2 border-purple-500 w-full">
          <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
          ${todoText}
        </div>
      `)

      document.querySelector(`.todo-${todoId} .done`).addEventListener('click', async function(event) {
        event.preventDefault()
        document.querySelector(`.todo-${todoId}`).classList.add('opacity-20')
        await db.collection('todos').doc(todoId).delete()
      })
      document.querySelector('#todo').value = ''
    }
  })

  // Step 2: Read existing to-dos from Firestore
  let querySnapshot = await db.collection('todos').get()
  console.log(`Number to todos in collection: ${querySnapshot.size}`)

  let todos = querySnapshot.docs
  for (let i=0; i<todos.length; i++) {
    let todoId = todos[i].id
    let todo = todos[i].data()
    let todoText = todo.text

    document.querySelector('.todos').insertAdjacentHTML('beforeend', `
      <div class="todo-${todoId} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${todoText}
      </div>
    `)

    document.querySelector(`.todo-${todoId} .done`).addEventListener('click', async function(event) {
      event.preventDefault()
      document.querySelector(`.todo-${todoId}`).classList.add('opacity-20')
      await db.collection('todos').doc(todoId).delete()
    })
  }

  // Step 3: Add code to Step 1 to add todo to Firestore
  // Step 4: Add code to allow completing todos
})