let table = document.querySelector("#book-list");

// Book Class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class : User Interface tasks

class UI {
    static displayBook() {
        const books = Storage.getBooks();

        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book) {
        let list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <th>${book.title}</th>
            <th>${book.author}</th>
            <th>${book.isbn}</th>
            <th><i class="fa fa-window-close" aria-hidden="true"></i></th>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    static deleteBook(el) {
        if (el.classList.contains("fa-window-close")) {
            el.parentElement.parentElement.remove();
        }
    }
}
// Storage Class

class Storage {
    static add(book) {
        const books = Storage.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();

        books.forEach((book, i) => {
            if (book.isbn === isbn) {
                books.splice(i, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBook);

// Event : Add a Book

document.querySelector("#book-form").addEventListener("submit", e => {
    e.preventDefault();

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    const book = new Book(title, author, isbn);
    console.log(book);
    UI.addBookToList(book);
    Storage.add(book);
    UI.clearFields();
});

// Event : Remove a Book

document.querySelector("#book-list").addEventListener("click", e => {
    UI.deleteBook(e.target);

    Storage.removeBook(
        e.target.parentElement.previousElementSibling.textContent
    );
});
