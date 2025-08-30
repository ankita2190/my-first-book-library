import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import { Box, Container, Typography } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import BookFilter from './components/BookFilter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
   <Container maxWidth='sm' sx={{mt: 5}}> 
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
    <Typography variant="h4">Book Library</Typography>
    <BookFilter />
  </Box>
    {/* <Typography variant='h4' gutterBottom>
      Book Library
    </Typography> */}

    <Routes>
      <Route path='/'
      element={
        <>
        <AddBook/>
        <BookList/>
        </>
      }
      >
      </Route>
      <Route path='/edit/:id' element={<EditBook/>}></Route>
    </Routes>
   </Container>
   </Router>
  )
}

export default App
