const library = document.getElementById('library');
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

function addBookToLibrary() {

}

function loadBooks() {

}

function addBookToDisplay() {

}