document.addEventListener('click', handleClick);

editing = false;
editId = null;

document.querySelector("form").addEventListener('submit', (e)=>{
    e.preventDefault();
})

function handleClick(e){
    const isDropdownButton = e.target.matches("[data-dropdown-button]");

    if(isDropdownButton){
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdownMenu = currentDropdown.querySelector("[data-dropdown-menu]")
        currentDropdownMenu.classList.toggle("active")
    }

    if(!isDropdownButton){
        dropdowns = Array.from(document.querySelectorAll("[data-dropdown-menu]"));

        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("active");
        })
    }
    
    const isModalButton = e.target.matches("[data-modal-button]");

    if(isModalButton){
        currentModal = document.getElementById(e.target.getAttribute("data-modal-button"))
        currentModal.classList.toggle("active");
    }

    const isModalDismiss = (!e.target.closest(".modal-container") || e.target.matches("[data-modal-dismiss]")) && !e.target.matches("li");

    if(isModalDismiss && !isModalButton){
        modals = Array.from(document.querySelectorAll("[data-modal]"));

        modals.forEach((modal) => {
            modal.classList.remove("active");
        })
    }
}

books = [];

function Book(title, author, pages, status, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.cover = cover;

    this.toggleRead = function() {
        this.status = this.status == "Read" ? "Not Read" : "Read";
    }
}

function refreshList(){
    list = document.querySelector("#booklist");

    list.innerHTML = "";

    const template = document.getElementById("book-template");

    books.forEach((book,index) => {
        newCard = document.createElement("div");
        newCard.appendChild(document.importNode(template.content, true));
        newCard.classList.add("card");

        newCard.querySelector(".title").innerHTML = book.title;
        newCard.querySelector(".author").innerHTML = book.author;
        newCard.querySelector(".status").innerHTML = book.status;
        newCard.querySelector(".mark-as-read").innerHTML = book.status == "Read" ? "Mark as not read" : "Mark as read";
        newCard.querySelector("[data-book-id]").setAttribute("data-book-id", index);
        
        list.appendChild(newCard);
    });
}

function handleForm(form){
    title = form.querySelector("#title").value;
    author = form.querySelector("#author").value;
    pages = form.querySelector("#pages").value;

    form.querySelector("#title").value = "";
    form.querySelector("#author").value = "";
    form.querySelector("#pages").value = "";
 

    if(!editing){
        book = new Book(title, author, pages, "Not Read", null);
        books.push(book);    
    } 

    if(editing){
        book = books[editId];
        book.title = title;
        book.author = author;
        book.pages = pages;

        editing = false;
        editId = null;
    }

    refreshList();
}

function markAsRead(button) {
    bookId = button.closest("[data-book-id]").getAttribute("data-book-id");
    
    books[bookId].toggleRead.call(books[bookId]);
    refreshList();
}

function deleteBook(button) {
    bookId = button.closest("[data-book-id]").getAttribute("data-book-id");
    
    books.splice(bookId,1);
    refreshList();
}

function editBook(button) {
    bookId = button.closest("[data-book-id]").getAttribute("data-book-id");
    book = books[bookId];
    
    editing = true;
    editId = bookId;

    formModal = document.getElementById("book-form");
    console.log(formModal)
    formModal.classList.add("active");
    console.log(formModal)

    form = formModal.querySelector("form");
    form.querySelector("#title").value = book.title;
    form.querySelector("#author").value = book.author;
    form.querySelector("#pages").value = book.pages;
    refreshList();
}