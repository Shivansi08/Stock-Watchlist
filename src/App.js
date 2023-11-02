import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Watchlist from './Watchlist';
import Screen from './Screen';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleStockAdd = (stock) => {
    setWatchlist([...watchlist, stock]);
  };

  const handleStockRemove = (stock) => {
    setWatchlist(watchlist.filter((item) => item !== stock));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Screen />} />
          <Route path="/home" element={<Home onStockAdd={handleStockAdd} />} />
          <Route
            path="/watchlist"
            element={
              <Watchlist watchlist={watchlist} onStockRemove={handleStockRemove} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
