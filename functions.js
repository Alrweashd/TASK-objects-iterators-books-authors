const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  let match = books.find((i) => i.id == bookId);
  if (!match) return "undefined";
  return match;
}

//console.log(getBookById(12, books));
//console.log(getBookById(0, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  let match = authors.find(
    (i) => i.name.toUpperCase() == authorName.toUpperCase()
  );
  if (match) return match;
  //else return "undefined";
  //console.log(authors);
}
//console.log(getAuthorByName("J.K. Rowling", authors));

//console.log(getAuthorByName("J.k. roWling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  // let newObj = [];
  // let temp = {
  //   author: "d",
  //   bookCount: 4,
  // };

  let newArray = authors.map(function (i) {
    let obj = { author: i.name, bookCount: i.books.length };
    return obj;
  });

  //  for (let i = 0; i <= authors.length - 1; i++) {
  //    const newTemp = new Object();
  //    newTemp.author = authors[i].name;
  //    newTemp.bookCount = authors[i].books.reduce((a, b) => a + b, 0);

  //   newObj.push(newTemp);
  // }

  //combine all object's values in one property
  // console.log(newObj);
  // let obj = {
  //   author: authors.map((i) => i.name),
  //   bookCount: authors.map((i) => i.books),
  // };

  return newArray;
}
//console.log("From bookCounts function: ", bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  books.forEach((book) => {
    let colorKey = book.color;
    let bookByColors = books.filter((book2) => colorKey == book2.color);
    let bookTitles = bookByColors.map((book) => book.title);
    colors[colorKey] = bookTitles;
  });

  return colors;
}

// function booksByColor1(books) {
//   const colors = { white: ["12 Rules of life", "A Dance With Dragons"] };
//   for (let i = 0; i < books.length; i++) {
//     let key = books[i].color;

//     let booksByColors = {}
//     books.forEach(function (j) {
//       if (books[i].color == j.color) {
//          j.title;
//       } else {
//       }
//     });
//     if (booksByColors) {
//       colors[key] = booksByColors;
//     }
//   }

//   // Your code goes here

//   return colors;
// }
//console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let author = getAuthorByName(authorName, authors);
  if (!author) return console.log("Author is not found");
  let booksIds = author.books;
  //console.log(booksIds);
  // let titles = [];
  // booksIds.forEach((id) => {
  //   titles.push(books.find((book) => book.id == id).title);
  // });
  return booksIds.map((id) => getBookById(id, books).title);
}

//console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  return [...authors].sort(
    (auth1, auth2) => auth2.books.length - auth1.books.length
  )[0].name;
}
//console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let authsNames = getBookById(bookId, books).authors.map((auth) => auth.name);
  console.log(authsNames);
  let reBooks = [];
  authsNames.forEach((name) => {
    titlesByAuthorName(name, authors, books).forEach((title) => {
      if (!reBooks.includes(title)) reBooks.push(title);
    });
  });
  //authsNames.map((name) => titlesByAuthorName(name, authors, books));
  console.log(reBooks);
}
relatedBooks(46, authors, books);
// console.log(relatedBooks(50, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
}
// console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
