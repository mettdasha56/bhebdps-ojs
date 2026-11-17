class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = Math.max(0, Math.min(100, value));
  }

  fix() {
    this.state *= 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

// Задача 2. Библиотека
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find((book) => book[type] === value) || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.name === bookName);

    if (index === -1) {
      return null;
    }

    return this.books.splice(index, 1)[0];
  }
}

// Проверяем работу библиотеки
const exampleLibrary = new Library("Районная библиотека");

exampleLibrary.addBook(
  new NovelBook("Автор", "Роман 1919 года", 1919, 240)
);

exampleLibrary.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);

exampleLibrary.addBook(
  new Magazine("Мурзилка", 1924, 60)
);

const bookFrom1919 = exampleLibrary.findBookBy("releaseDate", 1919);
const borrowedBook = exampleLibrary.giveBookByName(bookFrom1919.name);

borrowedBook.state = 25;
borrowedBook.fix();

exampleLibrary.addBook(borrowedBook);

// Задача 3. Журнал успеваемости
class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (!Number.isInteger(mark) || mark < 2 || mark > 5) {
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(this.marks, subject)) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    const marks = this.marks[subject];

    if (!marks || marks.length === 0) {
      return 0;
    }

    const sum = marks.reduce((total, mark) => total + mark, 0);
    return sum / marks.length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    const total = subjects.reduce(
      (sum, subject) => sum + this.getAverageBySubject(subject),
      0
    );

    return total / subjects.length;
  }
}
