"use strict";


class Book {
    constructor(title, author, genre, numPages, publicationDate, isbn, available, due) {
        this.title = title,
            this.author = author,
            this.genre = genre,
            this.numPages = numPages,
            this.publicationDate = publicationDate,
            this.isbn = isbn,
            this.available = available,
            this.due = due
    }
}

class Library {

    constructor() {
        this.data = [];
        this.numberOfBooks = 0;
    }

    initializeLibrary() {
        let initialCollection =
            [new Book('The Well-Laden Ship', 'Egbert of Liege; Babcock, Robert Gary (Trans.)', 'Fantasy', 356, 2013, 9780674051270, 'Yes', ''),
            new Book('Grimm\'s Fairy Tales', 'The Brother Grimms: Comb, Lorraine (Illust.)', 'Horror', 244, 2011, 133529543436, 'No', '2023-02-04'),
            new Book('Dracula: Sense and Nonsense', 'Miller, Elizabeth; Leatherdale, Clive (Intro.)', 'Fiction', 256, 2011, 834529446456, 'No', '2023-01-30'),
            new Book('Algonquin Cat', 'Shaffner, Val', 'Fiction', 67, 1980, 9780517147115, 'Yes', ''),
            new Book('Reynard the Fox', 'Avery, Anne Louise', 'Comics', 256, 2020, 9781851245550, 'No', '2023-02-04'),
            new Book('The Cat In The Hat Comes Back', 'SEUSS, Dr.', 'Comedy', 138, 1958, 3562502309847, 'No', '2023-02-12')];

        for (let i = 0; i < initialCollection.length; i++) {
            this.addBookToLibrary(initialCollection[i]);
            this.data[i] = initialCollection[i];
        }
        this.numberOfBooks = initialCollection.length;
    }

    addBookToLibrary(book) {
        this.data[this.numberOfBooks] = book;
        this.numberOfBooks++;
    }

    removeBook(index) {
        this.data.splice(index, 1);
        this.numberOfBooks--;
        displayController.updateTable();
    }

    markAvailable(index) {
        this.data[index].available = 'Yes';
        this.data[index].due = '';
        displayController.updateTable();
    }
};



const library = new Library();
library.initializeLibrary();



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

        for (let key of Object.keys(library.data[0])) {
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
        Object.values(library.data).map((book, i) => _addToTable(book, i));
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
        removeButton.addEventListener('click', () => library.removeBook(index));
        const markAvailableBtn = document.createElement('button');

        const mark_td = document.createElement('td');
        markAvailableBtn.innerText = 'Mark Available';
        markAvailableBtn.classList.add('avail-btn');
        markAvailableBtn.addEventListener('click', () => library.markAvailable(index));

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

        library.addBookToLibrary(book);
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