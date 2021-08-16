const body = document.querySelector("body");
const library = document.getElementById("library");
const addNewBookBtn = document.getElementById("new-book");
const bookFormScreen = document.getElementById("book-form-screen");
const addBookForm = document.getElementById("add-book");

let myLibrary = JSON.parse(localStorage.getItem("libraryBooks")) || [];
let entries = myLibrary.length;

function Book(title, author, pages, read, bookImg = "") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookImg = bookImg;
}

function loadBooks() {
  if (!myLibrary) return;
  myLibrary.forEach((book, idx) => {
    addBookToDisplay(book, idx);
  });
}

function addBookToDisplay(book, idx) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  const bookImgURL = book.bookImg || "missing_cover.jpg";
  bookCard.innerHTML = `
    <img src="${bookImgURL}" alt="${book.title} cover image">
    <div class="bookCard-info">
      <div class="book-info">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages} pages</p>
      </div>
      <div class="bookStatus">
        <button class='btn readBtn ${book.read ? 'active-reading' : ''}' onclick="updateReadStatus(${idx})">
          ${book.read ? "Read" : "Not Read"}
        </button>
        <button class="btn deleteBtn" onclick="removeBook(${idx})">
          Delete
        </button>
      </div>
    </div>
  `;
  library.appendChild(bookCard);
}

function removeBook(idx) {
  myLibrary[idx] = {};
  const bookCard = library.children[idx];
  bookCard.classList.add("hidden");
  updateLocalStorage();
}

function updateReadStatus(idx) {
  myLibrary[idx] = {
    ...myLibrary[idx],
    read: !myLibrary[idx].read,
  };
  const bookCard = library.children[idx];
  const readBtn = bookCard.querySelector(".readBtn");
  readBtn.textContent = myLibrary[idx].read ? "Read" : "Not Read";
  readBtn.classList.toggle('active-reading');
  updateLocalStorage();
}

function updateLocalStorage() {
  const books = myLibrary.filter((book) => {
    return book.title && book.author && book.pages;
  });
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}

addNewBookBtn.addEventListener("click", showForm);
document.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const newBook = new Book(
    e.target.title.value,
    e.target.author.value,
    e.target.pages.value,
    e.target.read.checked,
    e.target.bookImg.value
  );
  myLibrary.push(newBook);
  updateLocalStorage();
  addBookToDisplay(newBook, entries++);
  addBookForm.reset();
  hideForm();
}

function showForm() {
  bookFormScreen.classList.add("form-screen-enter");
  setTimeout(
    () =>
      bookFormScreen.classList.contains("form-screen-enter") &&
      bookFormScreen.classList.add("form-screen-enter-active"),
    150
  );
  bookFormScreen.classList.add("active");
  // Listen to if we click outside the form (to close "add form" screen)
  document.addEventListener("click", exitForm);
}

function hideForm() {
  document.removeEventListener("click", exitForm);
  bookFormScreen.classList.remove(
    "form-screen-enter",
    "form-screen-enter-active"
  );
}

function exitForm(e) {
  if (e.target.dataset.hasOwnProperty("outside")) {
    hideForm();
  }
}

// Initialization:
loadBooks();
