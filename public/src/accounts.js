function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++){
    const {id: accountId} = accounts[i];
    if (id === accountId){
      return accounts[i];
    }
  }
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1: -1))
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const{id: accountId} = account;
  let borrowCount = 0;
  for(i = 0; i < books.length; i++){
        for(b = 0; b< books[i].borrows.length; b++){
      if (books[i].borrows[b].id === accountId){
        borrowCount += 1;
      }
    }
  } return borrowCount;
  
  }

  function getBooksPossessedByAccount(account, books, authors) {
    const borrowedBooks = books.filter((book) => {
      const isBorrowed = book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned);
      return isBorrowed;
    });
  
    borrowedBooks.forEach((book) => {
      const author = authors.find((auth) => auth.id === book.authorId);
      book.author = author;
    });
  
    return borrowedBooks;
  }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
