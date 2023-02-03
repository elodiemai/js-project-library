"use strict";

let myLibrary = [];

function Book(title, author, genre, numPages, publicationDate, isbn, available, due) {
    this.title = title,
        this.author = author,
        this.genre = genre,
        this.numPages = numPages,
        this.publicationDate = publicationDate,
        this.isbn = isbn,
        this.available = available,
        this.due = due
}

const libraryController = (() => {
    const _initLibrary = (() => {
        const book1 = new Book('The Well-Laden Ship', 'Egbert of Liege; Babcock, Robert Gary (Trans.)', 'Fantasy', 356, 2013, 9780674051270, 'Yes', '');
        const book2 = new Book('Grimm\'s Fairy Tales', 'The Brother Grimms: Comb, Lorraine (Illust.)', 'Horror', 244, 2011, 133529543436, 'No', '2023-02-04');
        const book3 = new Book('Dracula: Sense and Nonsense', 'Miller, Elizabeth; Leatherdale, Clive (Intro.)', 'Fiction', 256, 2011, 834529446456, 'No', '2023-01-30');
        const book4 = new Book('Algonquin Cat', 'Shaffner, Val', 'Fiction', 67, 1980, 9780517147115, 'Yes', '');
        const book5 = new Book('Reynard the Fox', 'Avery, Anne Louise', 'Comics', 256, 2020, 9781851245550, 'No', '2023-02-04');
        const book6 = new Book('The Cat In The Hat Comes Back', 'SEUSS, Dr.', 'Comedy', 138, 1958, 3562502309847, 'No', '2023-02-12');

        addBookToLibrary(book1);
        addBookToLibrary(book2);
        addBookToLibrary(book3);
        addBookToLibrary(book4);
        addBookToLibrary(book5);
        addBookToLibrary(book6);
    })();

    function addBookToLibrary(book) {
        myLibrary.push(book);
    }

    function removeBook(index) {
        myLibrary.splice(index, 1);
        displayController.updateTable();
    }

    function markAvailable(index) {
        myLibrary[index].available = 'Yes';
        myLibrary[index].due = '';
        displayController.updateTable();
    }

    return {
        addBookToLibrary,
        removeBook,
        markAvailable
    }

})();

const displayController = (() => {

    let displayFields = {
        'title': 'Title',
        'genre': 'Genre',
        'isbn': 'ISBN',
        'author': 'Author(s)',
        'numPages': '# of pages',
        'publicationDate': 'Year',
        'due': 'Due date',
        'available': 'Available at the library'

    };

    const _initHeader = () => {
        const table = document.querySelector('table');
        table.appendChild(document.createElement('thead'));

        const thead = document.querySelector('thead');

        for (let key in myLibrary[0]) {
            const th = document.createElement('th');
            th.innerText = displayFields[key] ?? key;
            thead.appendChild(th);
        }

        for (let i = 1; i <= 2; i++) {
            const remove_th = document.createElement('th');
            remove_th.innerText = '';
            thead.appendChild(remove_th);
        }

        table.appendChild(document.createElement('tbody'));
        const tbody = document.querySelector('tbody');

    };

    const _initAddEventForm = () => {
        document.getElementById('add').addEventListener('click', _displayForm);
        document.getElementById('cancel').addEventListener('click', _displayForm);
        document.getElementById('checkbox-available').addEventListener('change', _displayDueDateField);
        document.getElementById('submit').addEventListener('click', _createBook);
    };

    function updateTable() {
        const tbody = document.querySelector('tbody');
        tbody.parentNode.removeChild(tbody);
        const table = document.querySelector('table');
        table.appendChild(document.createElement('tbody'));
        myLibrary.map((book, i) => _addToTable(book, i));
    };

    function _addToTable(book, index) {
        const tr = document.createElement('tr');
        tr.setAttribute('data-attribute', index);
        const tbody = document.querySelector('tbody');
        tbody.appendChild(tr);
        for (let key in book) {
            const td = document.createElement('td');
            td.innerText = book[key];
            tr.appendChild(td);
        }
        const remove_td = document.createElement('td');
        const removeButton = document.createElement('button');

        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => libraryController.removeBook(index));
        const markAvailableBtn = document.createElement('button');

        const mark_td = document.createElement('td');
        markAvailableBtn.innerText = 'Mark Available';
        markAvailableBtn.classList.add('avail-btn');
        markAvailableBtn.addEventListener('click', () => libraryController.markAvailable(index));

        tr.appendChild(mark_td);
        tr.appendChild(remove_td);
        mark_td.appendChild(markAvailableBtn);
        remove_td.appendChild(removeButton);
    }


    function _displayForm() {
        document.querySelector('.form').classList.toggle('disabled');
        document.querySelector('#add').classList.toggle('disabled');
        document.querySelector('#cancel').classList.toggle('disabled');
        document.querySelector('#submit').classList.toggle('disabled');
        _displayDueDateField();
    }


    function _displayDueDateField() {
        if (document.getElementById('checkbox-available').checked) document.querySelector('#due-date').style.display = 'none';
        else document.querySelector('#due-date').style.display = 'grid';
    }

    function _createBook(event) {
        event.preventDefault();
        const title = document.getElementById('input-title').value;
        const author = document.getElementById('input-author').value;
        const genre = document.getElementById('select-genre').value;
        const numPages = document.getElementById('input-pages').value;
        const publicationDate = document.getElementById('input-year').value;
        const isbn = document.getElementById('input-isbn').value;
        const available = (document.getElementById('checkbox-available').checked) ? 'Yes' : 'No';
        const due = document.getElementById('input-due').value;

        const book = new Book(
            title,
            author,
            genre,
            numPages,
            publicationDate,
            isbn,
            available,
            due
        );

        libraryController.addBookToLibrary(book);
        updateTable();
    }

    const _init = (() => {
        _initAddEventForm();
        _initHeader();
        updateTable();
    })();

    return {
        updateTable,
    }

})();