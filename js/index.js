document.addEventListener("DOMContentLoaded", function() {
  const listBooks = document.querySelector('#list')
  const showPanel = document.querySelector('#show-panel')

  const showDetailBooks = (book) => {
    
    fetch(`http://localhost:3000/books/${book.id}`)
    .then(response => response.json())
    .then(obj_books => {
    
    //element.preventDefault()
    
    showPanel.innerHTML = ""
    let bookThumbnail = document.createElement('img')
    let title = document.createElement("h3")
    let subtitle = document.createElement("h3")
    let author = document.createElement("h3")
    let description = document.createElement('p')
    let userList = document.createElement('ul')
    let button = document.createElement('button')

    bookThumbnail.src = obj_books.img_url
    title.textContent = obj_books.title
    subtitle.textContent = obj_books.subtitle
    author.textContent = obj_books.author
    description.textContent = obj_books.description
    button.textContent = "Like"
    button.id = obj_books.id
    
    obj_books.users.forEach(user => {
      let li = document.createElement('li')
      li.textContent = user.username
      li.id = user.id
      userList.append(li)
    })

    button.addEventListener('click', () => {
      likeBook(obj_books)
    })
    
    showPanel.append(bookThumbnail, title, subtitle, author, description, userList, button)

    })
  }

  const likeBook = (book) => {

    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          "users": [...book.users, { "id": 1, "username": "pouros"} ] 
        })
      })
    .then(response => response.json())
    .then(obj_books => showDetailBooks(obj_books))
    }
    
  
  
  const listBooksOnPage = (book) => {

    let bookTitle = document.createElement('li')

    bookTitle.innerText = book.title
    bookTitle.id = book.id

    bookTitle.addEventListener('click', () => {
      showDetailBooks(book)
    })

    listBooks.append(bookTitle)
  }

  fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(obj_books => {
    obj_books.forEach(book => {
      listBooksOnPage(book)
    })
  })  
});
