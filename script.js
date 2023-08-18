// Select
var addBookBtn = document.getElementById("addBookBtn");
var modal = document.getElementById("myModal");

// Open modal When Button is clicked
addBookBtn.onclick = function () {
  modal.style.display = "block";
};

// Close it when anywhere outside the modal is clicked
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// End of the Modal Script

let myLibrary = [];

function Book(title, author, pages, rdStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.rdStatus = rdStatus;
}

function addBookToLibrary(title, author, pages, rdStatus) {
  const book = new Book(title, author, pages, rdStatus);
  myLibrary.push(book);
  console.log(myLibrary);
}

function getInputValue() {
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const checkbox = document.querySelector('input[name="checkbox"]');

  if (checkbox.checked) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      true
    );
  } else {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      false
    );
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  form.reset();
}

// Show New Book info in the library
function showInTheLibrary() {
  const BookGrids = document.querySelector("#book-grids");
  // Clear any existing book-cards to avoid duplication
  BookGrids.innerHTML = "";

  getInputValue();
  // checkValidation();
  
  // Iterate over the myLibrary Array
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    // Create elements
    const boxCard = document.createElement("div");
    const titleText = document.createElement("p");
    const authorText = document.createElement("p");
    const pagesText = document.createElement("p");
    const buttonGroup = document.createElement("div");
    let readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    boxCard.classList.add("book-card");
    buttonGroup.classList.add("button-group");
    readBtn.classList.add("btn");
    removeBtn.classList.add("btn");
    readBtn.onclick = () => toggleRead(book, readBtn);
    removeBtn.onclick = () => {
      removeBook(boxCard, book);
    };

    // Displays all the element in the bookCard
    titleText.textContent = book.title;
    authorText.textContent = book.author;
    pagesText.textContent = `${book.pages} pages`;
    removeBtn.textContent = "Remove";

    if (book.rdStatus) {
      readBtn.textContent = "Read";
      readBtn.classList.add("btn-isRead");
    } else {
      readBtn.textContent = "Not read";
      readBtn.classList.add("btn-notRead");
    }

    // Append Elemets
    boxCard.appendChild(titleText);
    boxCard.appendChild(authorText);
    boxCard.appendChild(pagesText);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    boxCard.appendChild(buttonGroup);
    BookGrids.appendChild(boxCard);
  }

  modal.style.display = "none";
}

// Delete card from the library
function removeBook(bookCard, book) {
  const BookGrids = document.querySelector("#book-grids");
  BookGrids.removeChild(bookCard);

  // Update the myLibrary arry after removing book
  const index = myLibrary.indexOf(book);
  if (index != -1) {
    myLibrary.splice(index, 1);
  }
}

// Toggle the read status of the book
function toggleRead(book, readBtn) {
  book.rdStatus = !book.rdStatus;

  if (book.rdStatus) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-isRead");
    readBtn.classList.remove("btn-notRead");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-notRead");
    readBtn.classList.remove("btn-isRead");
  }
}

function checkValidation() {
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var pages = document.getElementById("pages").value;

  if (title === "" || author === "" || pages === "") {
      return false;
  } else {
    showInTheLibrary();
    return true;
  }
}
