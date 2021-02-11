document.addEventListener('DOMContentLoaded', async function(event) {
  
  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    let todoText = document.querySelector('#todo').value

    if (todoText.length > 0) {
      document.querySelector('.todos').insertAdjacentHTML('beforeend', `
        <div class="py-4 text-xl border-b-2 border-purple-500 w-full">
          ${todoText}
        </div>
      `)
      document.querySelector('#todo').value = ''
    }
  })

  // Step 2: Read existing to-dos from Firestore
  // Step 3: Add code to Step 1 to add todo to Firestore
  // Step 4: Add code to allow completing todos
})