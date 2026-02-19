import * as types from "./actionType";

function addBook(bookDetail){
    return {
        type:types.ADD_BOOK,
        bookDetail:bookDetail
    }
}

const actions = {
    addBook,
}
export default actions