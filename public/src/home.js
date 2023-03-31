function getTotalBooksCount(books) {
  return books.length; 
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let checkedOut = 0;
  for(let i = 0; i < books.length; i++){
    for(let b = 0; b < books[i].borrows.length; b++){
      if(books[i].borrows[b].returned === false){
        checkedOut += 1;
      }
    }
  } return checkedOut;
}

function getMostCommonGenres(books) {
  const countByGenre = books.reduce((counts, book) => {
    const genre = book.genre;
    counts[genre] = (counts[genre] || 0) + 1;
    return counts;
  }, {});
  
  const sortedByGenre = Object.entries(countByGenre)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, count]) => ({ name: genre, count: count }));
  return sortedByGenre;
};

function getMostPopularBooks(books) {
  const booksWithBorrowsCount = books.map(book => ({
    ...book,
    borrowsCount: book.borrows.length
  }));
  
  const sortedByBorrowsCount = booksWithBorrowsCount.sort((a, b) => b.borrowsCount - a.borrowsCount);
  
  return sortedByBorrowsCount.slice(0, 5).map(book => ({ name: book.title, count: book.borrowsCount }));
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = authors.reduce((acc, author) => {
    acc[author.id] = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    };
    return acc;
  }, {});

  books.forEach((book) => {
    const { authorId, borrows } = book;
    if (authorCounts[authorId]) {
      authorCounts[authorId].count += borrows.length;
    }
  });

  const result = Object.values(authorCounts).sort((a, b) => b.count - a.count).slice(0, 5);
  return result;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
