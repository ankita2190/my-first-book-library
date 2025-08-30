import React, {useEffect, useState} from 'react';
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/index';
import { toggleReadUnread } from '../store/slice';
import { useNavigate } from "react-router-dom";
import BookFilter from '../components/BookFilter'

export default function BookList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {books, filter} = useSelector((state: RootState) => state.books);

    let filteredBooks = [];
    if(filter === 'all'){
        filteredBooks = books;
    }
    else{
        filteredBooks = books.filter((book) => filter === 'read' ? book.read : !book.read);
    }
    const handleReadUnread = (id: string) =>{
        dispatch(toggleReadUnread(id));
    }
    return(
        <>
        {/* <BookFilter /> */}
        <Box display="grid" gap={2}>
            {filteredBooks.map((book) => (
            <Card key={book.id}>
                <CardContent>
                    <Typography variant='h6'>
                        {book.title}
                    </Typography>
                    <Typography variant='body2'>
                        {book.author}
                    </Typography>
                     {book.description && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {book.description}
                        </Typography>
                    )}
                    <Button
                    onClick={() => handleReadUnread(book.id)}>
                        Mark as {book.read ? "Unread" : "Read"}
                    </Button>
                                <Button
              variant="contained"
              size="small"
              onClick={() => navigate(`/edit/${book.id}`)}
            >
              Edit
            </Button>
                </CardContent>
            </Card>
            ))}
        </Box>
        </>
    );
}