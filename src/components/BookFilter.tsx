import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/index';
import { filterBookList } from '../store/slice';
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function BookFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.books.filter);

  const handleChange = (event: any) => {
    dispatch(filterBookList(event.target.value as "all" | "read" | "unread"));
  };

  return (
    <Box mb={3} width={200}>
      <FormControl fullWidth>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleChange}
          size='small'
          label='Filter'
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="read">Read</MenuItem>
          <MenuItem value="unread">Unread</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
