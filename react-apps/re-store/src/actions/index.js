const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    };
};

const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST' //получаем данные
    };
};

const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    };
};

const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId,
    };
};

const bookRemovedFromCart = (bookId) => {
    return {
        type: 'BOOK_REMOVED_FROM_CART',
        payload: bookId,
    };
};
const allBooksRemovedFromCart = (bookId) => {
    return {
        type: 'ALL_BOOKS_REMOVED_FROM_CART',
        payload: bookId,
    };
};


//внутренняя функция предназначена для компомнента
//внешняя для mapDispatchToProps
const fetchBooks = (bookstoreService, dispatch) => () => {
    console.log('fetching books');
    dispatch(booksRequested());
    bookstoreService.Books
        .then(data => dispatch(booksLoaded(data)))
        .catch(error => dispatch(booksError(error)));
    //this.props.booksLoaded(data);
};

export {
    //booksLoaded,
    //booksRequested,
    //booksError,
    fetchBooks,
    bookAddedToCart,
    bookRemovedFromCart,
    allBooksRemovedFromCart,
};