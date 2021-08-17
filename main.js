const library = document.getElementById("library");
const addNewBookBtn = document.getElementById("new-book");
const bookFormScreen = document.getElementById("book-form-screen");
const addBookForm = document.getElementById("add-book");
const displayOrder = document.getElementById("display-options");

let myLibrary = [];
let sortOrder = "insert-asc";

function Book(title, author, pages, read, bookImg) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookImg = bookImg;
}

function loadBooksFromStorage() {
  let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];
  books.forEach((book) => {
    myLibrary.push(
      new Book(book.title, book.author, book.pages, book.read, book.bookImg)
    );
  });
  displayBooks(myLibrary, sortOrder);
}

function displayBooks(books, order) {
  library.innerHTML = "";
  let bookOrder = [...books];
  if (order === "insert-dsc") {
    bookOrder = bookOrder.reverse();
  }
  if (order === "title-asc") {
    bookOrder = bookOrder.sort((a, b) => {
      return a.title.localeCompare(b.title, "en", { sensitivity: "variant" });
    });
  }
  if (order === "title-dsc") {
    bookOrder = bookOrder.sort((a, b) => {
      return (
        a.title.localeCompare(b.title, "en", { sensitivity: "variant" }) * -1
      );
    });
  }

  bookOrder.forEach((book) => {
    addBookToDisplay(book);
  });
}

function addBookToDisplay(book) {
  const bookCard = document.createElement("div");
  library.appendChild(bookCard);
  bookCard.classList.add("book-card");

  const bookImg = document.createElement("img");
  bookCard.appendChild(bookImg);

  const bookImgURL = book.bookImg || "missing_cover.jpg";
  bookImg.setAttribute("src", bookImgURL);
  bookImg.setAttribute("alt", book.title + "cover image");

  const bookCardInfo = document.createElement("div");
  bookCard.appendChild(bookCardInfo);
  bookCardInfo.classList.add("bookCard-info");

  const bookInfo = document.createElement("div");
  bookCardInfo.appendChild(bookInfo);
  bookInfo.classList.add("book-info");

  const title = document.createElement("p");
  bookInfo.appendChild(title);
  title.classList.add("title");
  title.textContent = book.title;

  const author = document.createElement("p");
  bookInfo.appendChild(author);
  author.classList.add("author");
  author.textContent = book.author;

  const pages = document.createElement("p");
  bookInfo.appendChild(pages);
  pages.classList.add("pages");
  pages.textContent = book.pages + " pages";

  const bookStatus = document.createElement("div");
  bookCardInfo.appendChild(bookStatus);
  bookStatus.classList.add("bookStatus");

  const readBtn = document.createElement("button");
  bookStatus.appendChild(readBtn);
  readBtn.classList = `btn readBtn ${book.read ? "active-reading" : ""}`;
  readBtn.textContent = book.read ? "Read" : "Not Read";

  readBtn.addEventListener("click", () => {
    book.read = !book.read;
    readBtn.textContent = book.read ? "Read" : "Not Read";
    readBtn.classList.toggle("active-reading");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  bookStatus.appendChild(deleteBtn);
  deleteBtn.classList = "btn deleteBtn";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    bookCard.classList.add("disappear");
    setTimeout(() => bookCard.classList.add("hidden"), 250);
    myLibrary.splice(myLibrary.indexOf(book), 1);
    updateLocalStorage();
  });
}

function updateLocalStorage() {
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
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
  displayBooks(myLibrary, sortOrder);
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

displayOrder.addEventListener("change", (e) => {
  sortOrder = e.target.value;
  displayBooks(myLibrary, sortOrder);
});

// Initialization:
loadBooksFromStorage();
