import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';

import backgroundImage from './stockwatchlist.jpg'; 

const Screen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    navigate('/' + event.target.value);
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    background: `url(${backgroundImage}) center/cover no-repeat`,
  };

  return (
    <div style={containerStyle}>
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        <FormControlLabel
          value="home"
          control={<Radio />}
          label="Go to Home"
          style={{fontSize:'106px', lineHeight: '1.5', color:'white'}}
        />
        <FormControlLabel
          value="watchlist"
          control={<Radio />}
          label="Go to Watchlist"
          style={{fontSize:'106px', lineHeight: '1.5', color:'white'}}
        />
      </RadioGroup>
    </div>
  );
};

export default Screen;
