import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type { Book } from "../types/book";

export interface BookState {
    books: Book[];
    filter: "all" | "read" | "unread"
}

const initialState: BookState = {
    books:[],
    filter: "all"
}

const bookSlice = createSlice({
    name:"books",
    initialState,
    reducers:{
        addBook: (state, action: PayloadAction<Book>) =>{
            state.books.push(action.payload);
        },

        toggleReadUnread: (state, action: PayloadAction<string>) => {
            const book = state.books.find((book) => book.id === action.payload);
            if(book){
                book.read = !book.read;
            }
        },
        updateBook: (state, action: PayloadAction<Book>) => {
            const index = state.books.findIndex((book) => book.id === action.payload.id);
            if(index !== -1){
                state.books[index] = action.payload
            }
        },
        filterBookList: (state, action: PayloadAction<BookState["filter"]>) => {
            state.filter = action.payload;
        }
    }
});

export const {addBook, toggleReadUnread, updateBook, filterBookList} = bookSlice.actions;
export default bookSlice.reducer;