import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const Home = ({ onStockAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      const apiKey = '1HSV5TNHR16FTSYW';
      setLoading(true);

      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.bestMatches) {
            setSearchResults(data.bestMatches);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleOpenSnackbar = (name) => {
    setMessage("Added to Watchlist successfully: " + name);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
  
    const filteredResults = searchResults.filter(result =>
      result['2. name'].toLowerCase().includes(input.toLowerCase())
    );
  
    setSearchResults(filteredResults);
  };
  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' }}>
      <Link to="/" style={{ fontSize: '16px', marginBottom: '20px', marginRight: '1440px' }}>  Back </Link>
      <Typography variant="h1" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
        Home
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          style={{ width: '400px', marginBottom: '20px' }}
          type="text"
          label="Search for stocks"
          variant="outlined"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>

      {searchTerm && (
        loading ? (
          <p>Loading...</p>
        ) : (
          <TableContainer component={Paper} style={{ width: '80%', marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Share Price</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result['2. name']}</TableCell>
                    <TableCell>{result['5. price']}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenSnackbar(result['2. name'])}
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
      
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message={message}
        />
      </Snackbar>
    </div>
  );
};

export default Home;
