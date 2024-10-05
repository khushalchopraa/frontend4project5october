import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  // Using async/await to fetch data
  const fetchDataAsync = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  // Using .then to fetch data
  const fetchDataThen = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => setCoins(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sortByMarketCap = () => {
    const sortedCoins = [...coins].sort((a, b) => b.market_cap - a.market_cap);
    setCoins(sortedCoins);
  };

  const sortByPercentageChange = () => {
    const sortedCoins = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    setCoins(sortedCoins);
  };

  return (
    <div className='App'>
      <nav>
        <input
          className='inputBox'
          type='text'
          placeholder='Search By Name or Symbol'
          value={search}
          onChange={handleSearch}
        />
        <button className='button' onClick={sortByMarketCap}>Sort By Mkt Cap</button>
        <button className='button' onClick={sortByPercentageChange}>Sort by percentage</button>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
            <th>Markert Capital</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td><img src={coin.image} alt={coin.name} width='30' /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>${coin.current_price}</td>
              <td>${coin.total_volume}</td>
              <td>Mkt Cap:${coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
