import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

const Watchlist = ({ watchlist, onStockRemove }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Link to="/" style={{ fontSize: '16px', marginBottom: '20px', marginRight: '1440px' }}>
        Back
      </Link>
      <Typography variant="h1" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
        Watchlist
      </Typography>

      <TableContainer component={Paper} style={{ width: '80%', marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Share Price</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchlist.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock['2. name']}</TableCell>
                <TableCell>{stock['5. price']}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onStockRemove(stock)}
                    startIcon={<RemoveIcon />}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Watchlist;
