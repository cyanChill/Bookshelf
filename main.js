const body = document.querySelector("body");
const library = document.getElementById("library");
const addNewBookBtn = document.getElementById("new-book");
const bookFormScreen = document.getElementById("book-form-screen");
const addBookForm = document.getElementById("add-book");

let myLibrary = [];

function Book() {
  title = "";
  author = "";
  pages = 0;
  read = false;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${pages} pages, ${
    read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary() {}

function loadBooks() {}

function addBookToDisplay() {}

addNewBookBtn.addEventListener("click", showForm);

// Listen to when form is submitted
document.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  addBookForm.reset();
}

function showForm() {
  bookFormScreen.classList.add("add-book-form-enter");
  setTimeout(
    () =>
      bookFormScreen.classList.contains("add-book-form-enter") &&
      bookFormScreen.classList.add("add-book-form-active"),
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
    "add-book-form-enter",
    "add-book-form-active"
  );
}

function exitForm() {
  bookFormScreen.classList.remove("active");
}
