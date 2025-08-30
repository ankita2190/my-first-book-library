import React from 'react';
import { TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { addBook } from '../store/slice';
import * as yup from 'yup';

type BookForm = {
  title: string;
  author: string;
  description: string;
};

const bookSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  description: yup.string().required('Description is required').min(50, 'Description must be at least 50 characters')
});

export default function AddBook() {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BookForm>({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      description: ''
    }
  });

  const onSubmit = (data: BookForm) => {
    dispatch(addBook({
      id: `book${Date.now()}${Math.random().toString(36).slice(2, 5)}`,
      title: data.title,
      author: data.author,
      description: data.description,
      read: false
    }));
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mb={3}>
      <Box display="flex" gap={2}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author"
              size="small"
              fullWidth
              error={!!errors.author}
              helperText={errors.author?.message}
            />
          )}
        />
      </Box>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            size="small"
            fullWidth
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Button type="submit" variant="contained">Add Book</Button>
    </Box>
  );
}
