class Book {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  available: boolean;

  constructor(id: number, title: string, author: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.available = true;
  }
  isAvailable() {
    return this.available;
  }
  markBorrowed() {
    this.available = false;
  }
  markReturned() {
    this.available = true;
  }
}

class Member {
  readonly id: number;
  readonly name: string;
  private borrowedBooks: Book[]; // member can have multiple books

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = []; // init with empty when the member is created
  }

  borrowBook(book: Book) {
    if (!book.isAvailable()) {  
        console.log("book is not available")
        return
    }
    this.borrowedBooks.push(book);
    book.markBorrowed();
  }
  returnBook(bookId: number) {
    // first we will mark it return

    for (const book of this.borrowedBooks) {
      if (book.id == bookId) {
        book.markReturned();
      }
    }

    // then we will update the member's list

    this.borrowedBooks = this.borrowedBooks.filter(
      (book) => book.id !== bookId,
    );
  }
  getBorrowedBooks() {
    console.log(this.name," : ",this.borrowedBooks);
  }
}

class Library {
  // lets assign a librarian
  private librarian: string;
  private books: Book[];
  readonly members: Member[];

  constructor() {
    this.librarian = "";
    this.books = [];
    this.members = [];
  }

  assignLibrarian(name: string) {
    this.librarian = name;
  }

// like it can have duplicate book
  addBook(newBook: Book) {
    this.books.push(newBook);
  }

  removeBook(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  registerMember(newMember: Member) {
    if (this.members.includes(newMember)) {
        console.log("member already exists")
        return
    }
    this.members.push(newMember);
  }

  findBook(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      console.log("book not found");
      return;
    }
    console.log(book);
    return;
  }
}

export { Book, Library, Member };
