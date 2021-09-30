import React from 'react';

const Coin = ({ coin, setSelectedCoin }) => {
  return (
    <div className='coin-global'>
      <div className='coin-data'>
        {coin.icon ? (
          <img src={coin.icon} alt={coin.asset_id} />
        ) : (
          <div className='coin-image-empty'>💲</div>
        )}

        <p>{coin.asset_id}</p>
      </div>

      <button onClick={() => setSelectedCoin(coin)}>Comprar</button>
    </div>
  );
};




export default Coin;
