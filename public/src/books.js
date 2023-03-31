function findAuthorById(authors, id) {
  for (let i = 0; i < authors.length; i++){
    const {id: authorId} = authors[i];
    if (id === authorId){
      return authors[i];
    }
  }
}

function findBookById(books, id) {
  for (let i = 0; i < books.length; i++){
    const {id: bookId} = books[i];
    if (id === bookId){
      return books[i];
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];
  let availableBooks = [];
  for (let i = 0; i < books.length; i++) {
    const {borrows: [{returned: returnStatus}]} = books[i];
    if (returnStatus === false) {
      borrowedBooks.push(books[i].title);
    } else {
      availableBooks.push(books[i].title);
    }
  }
  return [borrowedBooks, availableBooks];
}

function getBorrowersForBook(book, accounts) {
  const booksBorrowed = book.borrows;
  const borrowers = [];
  for(let i = 0; i < booksBorrowed.length && borrowers.length < 10; i++){
    const borrow = booksBorrowed[i];
    const account = accounts.find(acc => acc.id === borrow.id);
    if(account){
      const borrower = {...borrow, ...account};
      borrowers.push(borrower);
    }
  }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
