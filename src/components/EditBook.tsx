import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Book } from '../types/book'
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../store/index';
import {updateBook} from '../store/slice';

const bookSchema = yup.object().shape({
      title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 50 characters")
    .required("Description is required")
})

export default function EditBook(){
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const book = useSelector((state: RootState) =>
    state.books.books.find((book) => book.id === id));
 
    const {control, handleSubmit} = useForm({
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      description: book?.description || "",
    },
    resolver: yupResolver(bookSchema),
    })

    const onSubmit =(data: any) => {
        if(id){
            dispatch(updateBook({id, ...data, read: book?.read || false }));
            navigate("/");
        }
    }

    if (!book) {
    return <Typography>Book not found</Typography>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Edit Book
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Author"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box mt={2} display="flex" gap={2}>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}