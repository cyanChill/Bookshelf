const body = document.querySelector("body");
const library = document.getElementById("library");
const addNewBookBtn = document.getElementById("new-book");
const bookFormScreen = document.getElementById("book-form-screen");
const addBookForm = document.getElementById("add-book");

let myLibrary = JSON.parse(localStorage.getItem("libraryBooks")) || [];

function Book(title, author, pages, read, bookImg = "") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookImg = bookImg;
}

function addBookToLibrary() {}

function loadBooks() {
  if (!myLibrary) return;
  myLibrary.forEach((book) => {
    addBookToDisplay(book);
  });
}

function addBookToDisplay(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  const bookImgURL = book.bookImg || "missing_cover.jpg";
  bookCard.innerHTML = `
    <img src="${bookImgURL}" alt="${book.title} cover image">
    <div class="book-info">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <p class="pages">${book.pages} pages</p>
    </div>
  `;
  library.appendChild(bookCard);
}

function removeBook() {}

function updateReadStatus() {}

addNewBookBtn.addEventListener("click", showForm);
// Listen to when form is submitted
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
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
  addBookToDisplay(newBook);
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
  document.addEventListener("click", (e) => {
    if (e.target.dataset.hasOwnProperty("outside")) {
      hideForm();
    }
  });
}

function hideForm() {
  document.removeEventListener("click", exitForm);
  bookFormScreen.classList.remove(
    "form-screen-enter",
    "form-screen-enter-active"
  );
}

function exitForm() {
  bookFormScreen.classList.remove("active");
}

// Initialization:
loadBooks();
