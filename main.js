const body = document.querySelector("body");
const library = document.getElementById("library");
const addNewBookBtn = document.getElementById("new-book");
const bookFormScreen = document.getElementById("book-form-screen");
const addBookForm = document.getElementById("add-book");
const displayOrder = document.getElementById("display-options");
const displayMode = document.getElementById("display-mode");
const deleteBtn = document.getElementById("deleteBtn");

let myLibrary = [];
let sortOrder = localStorage.getItem("sortOrder") || "insert-asc";
let formMode = "submit";
let currCard = {};

class Book {
  constructor(title, author, pages, read, bookImg) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookImg = bookImg;
  }
}

/* Event Listeners */
addNewBookBtn.addEventListener("click", showForm);
document.addEventListener("submit", submitForm);

deleteBtn.addEventListener("click", () => {
  hideForm();
  currCard.domElement.classList.add("disappear");
  myLibrary.splice(myLibrary.indexOf(currCard.bookObj), 1);
  updateLocalStorage();
  currCard.domElement.addEventListener("transitionend", () => {
    currCard.domElement.remove();
    noBooks(myLibrary);
    currCard = {};
  });
});

displayOrder.addEventListener("change", (e) => {
  sortOrder = e.target.value;
  displayBooks(myLibrary, sortOrder);
  localStorage.setItem("sortOrder", sortOrder);
});

displayMode.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("displaymode", body.classList);
});

function loadBooksFromStorage() {
  let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];
  if (books.length > 0) {
    books.forEach((book) => {
      myLibrary.push(new Book(book.title, book.author, book.pages, book.read, book.bookImg));
    });
    displayBooks(myLibrary, sortOrder);
  }
}

function displayBooks(books, order) {
  if (noBooks(books)) return;

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
      return a.title.localeCompare(b.title, "en", { sensitivity: "variant" }) * -1;
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

  const readStatusDiv = document.createElement("div");
  bookInfo.appendChild(readStatusDiv);
  readStatusDiv.classList.add("reading-status");

  const readIcon = document.createElement("span");
  readStatusDiv.appendChild(readIcon);
  const readStatus = document.createElement("p");
  readStatusDiv.appendChild(readStatus);

  if (book.read === "finished") {
    readIcon.classList = "read-icon finished";
    readStatus.textContent = "Finished Reading";
  } else if (book.read === "reading") {
    readIcon.classList = "read-icon reading";
    readStatus.textContent = "Currently Reading";
  } else if (book.read === "dropped") {
    readIcon.classList = "read-icon dropped";
    readStatus.textContent = "Dropped";
  } else {
    readIcon.classList = "read-icon planning";
    readStatus.textContent = "Planning to Read";
  }

  const bookStatus = document.createElement("div");
  bookCardInfo.appendChild(bookStatus);
  bookStatus.classList.add("bookStatus");

  const editBtn = document.createElement("button");
  bookStatus.appendChild(editBtn);
  editBtn.classList = "btn editBtn";
  editBtn.innerHTML = `Edit <i class="far fa-edit"></i>`;

  editBtn.addEventListener("click", (e) => {
    showForm();
    currCard = {
      domElement: e.target.parentNode.parentNode.parentNode,
      bookObj: book,
    };
    addBookForm.title.value = book.title;
    addBookForm.author.value = book.author;
    addBookForm.pages.value = book.pages;
    addBookForm.bookImg.value = book.bookImg;
    addBookForm.readStatus.value = book.read;
    formMode = "card";
    deleteBtn.classList.remove("hidden");
  });
}

function updateLocalStorage() {
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
}

function noBooks(books) {
  if (books.length === 0) {
    library.innerHTML = `
      <div class="note-container">
        <p class="note">
          You seem to not have any books in your library. Click the "Add New
          Book" button to get started!
        </p>
        <p class="note">
          Note that this app uses your browser's local storage.
        </p>
      </div>
    `;
    return true;
  }
  return false;
}

function submitForm(e) {
  e.preventDefault();

  const newBook = new Book(
    e.target.title.value,
    e.target.author.value,
    e.target.pages.value,
    e.target.readStatus.value,
    e.target.bookImg.value
  );
  if (formMode === "submit") {
    myLibrary.push(newBook);
  } else if (formMode === "card") {
    myLibrary.splice(myLibrary.indexOf(currCard.bookObj), 1, newBook);
  }
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
  // Listen to if we click outside the form (to close "add form" screen)
  document.addEventListener("click", exitForm);
}

function hideForm() {
  document.removeEventListener("click", exitForm);
  deleteBtn.classList.add("hidden");
  addBookForm.reset();
  formMode = "submit";
  bookFormScreen.classList.remove("form-screen-enter", "form-screen-enter-active");
}

function exitForm(e) {
  if (e.target.dataset.hasOwnProperty("outside")) {
    hideForm();
  }
}

// Initialization using IIFE:
(function () {
  body.classList = localStorage.getItem("displaymode") || "";
  const select = document.getElementById("display-order");
  select.value = sortOrder;
  loadBooksFromStorage();
})();
