let myLibrary = [];
const container = document.querySelector(".table-container");
const table = document.createElement("table");
const form = document.querySelector(".form-container");
container.appendChild(table);


let Book = function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        if (read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    }
}

function addBookToLibrary() {
    // do stuff
    book1 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "309", true);
    book2 = new Book("The Last Wish: Introducing The Witcher", "Andrzej Sapkowski", "384", false);

    myLibrary.push(book1, book2)
}

function displayLibrary() {

    let tableCellPadding = 2;
    const headRow = document.createElement("tr");

    if (myLibrary.length !== 0) {

        Object.keys(myLibrary[0]).forEach(key => {
            if (typeof book1[key] !== "function") {
                const tableHeader = document.createElement("th");
                tableHeader.textContent = key;
                headRow.appendChild(tableHeader);
            }
        });

        for (let i = 0; i < tableCellPadding; i++) {
            const tableHeader = document.createElement("th");
            headRow.appendChild(tableHeader);
        }
    }


    table.appendChild(headRow);

    let index = 0;
    myLibrary.forEach(object => {

        const row = document.createElement("tr");

        for (let field in object) {
            if (typeof object[field] !== "function") {
                const tableData = document.createElement("td");
                tableData.textContent = object[field];
                row.appendChild(tableData);
            }
        }

        const tableDataForDelete = document.createElement("td");
        const tableDataForEdit = document.createElement("td");
        const deleteButton = document.createElement("button");
        const readButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", index);
        deleteButton.classList.add("delete-button");
        tableDataForDelete.appendChild(deleteButton);
        
        readButton.textContent = "Change read status"
        readButton.setAttribute("data-index", index);
        readButton.classList.add("read-button");        
        tableDataForEdit.appendChild(readButton);

        row.appendChild(tableDataForDelete);
        row.appendChild(tableDataForEdit);


        table.appendChild(row);
        index++;
    });

    addEventListenersToDeleteButtons();
    addEventListenersToChangeReadButtons();
}




function addEventListenersToButtons() {

    const buttonNewBook = document.querySelector(".new-book");
    const submitButton = document.querySelector(".submit");
    const returnButton = document.querySelector(".return");

    function handleNewBookButton() {
        table.classList.toggle("hidden");
        buttonNewBook.classList.toggle("hidden");
        form.classList.toggle("hidden");
    }


    buttonNewBook.addEventListener("click", handleNewBookButton);

    returnButton.addEventListener("click", e => {
        table.classList.toggle("hidden");
        buttonNewBook.classList.toggle("hidden");
        form.classList.toggle("hidden");
    });

    submitButton.addEventListener("click", e => {
        const titleField = document.querySelector("#title");
        const authorField = document.querySelector("#author");
        const pagesField = document.querySelector("#pages");
        const readField = document.querySelector("input[name='read']:checked");
        let book = new Book(titleField.value, authorField.value, pagesField.value, readField.value);
        myLibrary.push(book);

        table.textContent = "";
        displayLibrary();
        table.classList.toggle("hidden");
        buttonNewBook.classList.toggle("hidden");
        form.classList.toggle("hidden");
    }
    );
}

function addEventListenersToDeleteButtons() {

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", e => {
            let index = parseInt(button.dataset.index);
            myLibrary.splice(index, 1);
            table.textContent = "";
            displayLibrary();
        });
    });

}

function addEventListenersToChangeReadButtons() {

    const readButtons = document.querySelectorAll(".read-button");
    readButtons.forEach(button => {
        button.addEventListener("click", e => {
            let index = parseInt(button.dataset.index);
            myLibrary[index].read = !myLibrary[index].read;
            table.textContent = "";
            displayLibrary();
        });
    });
}

addBookToLibrary();
addEventListenersToButtons();
displayLibrary();


