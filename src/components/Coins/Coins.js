import React from 'react';
import Coin from 'components/Coin/Coin';

const Coins = ({ coins, setSelectedCoin }) => {
  return (
    <div className='coins-container'>
      {coins.map((coin) => (
        <Coin setSelectedCoin={setSelectedCoin} coin={coin} />
      ))}
    </div>
  );
};

export default Coins;
