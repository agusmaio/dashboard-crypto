import React, { useState } from 'react';
import commissions from 'constants/commissions';
import ErrorMessage from 'components/Common/ErrorMessage';

const Exchange = ({ selectHandler, exchange, selectedExchange }) => {
  return (
    <button
      onClick={() => selectHandler(exchange.exchange_id)}
      className={selectedExchange === exchange.exchange_id ? 'selected' : ''}
    >
      <img src={exchange.icon} alt={exchange.exchange_id} />
      <p>{exchange.exchange_id}</p>
      <span>Comisión: {commissions[exchange.index]}%</span>
    </button>
  );
};

const BuyModal = ({ coin, handleClose, exchanges }) => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [value, setValue] = useState(0);
  const [purchaseDone, setPurchaseDone] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);

  const findExchangeIndex = (id) => {
    return exchanges.find((exchange) => exchange.exchange_id === id)?.index;
  };

  const amountWithComission =
    value - value * (commissions[findExchangeIndex(selectedExchange)] / 100);
  const cryptoAmount = amountWithComission / coin.exchangeRate.rate;

  const completePurchaseHandler = () => {
    if (isNaN(cryptoAmount)) {
      setPurchaseError('Debe seleccionar un exchange');
      return;
    }

    if (cryptoAmount <= 0) {
      setPurchaseError('El valor de compra debe ser mayor a 0');
      return;
    }

    setPurchaseDone(true);
  };

  const selectExchangeHandler = (data) => {
    setSelectedExchange(data);
    setPurchaseError('');
  };

  return (
    <div className='buy-modal'>
      <div className='buy-modal-container'>
        <button onClick={handleClose} className='buy-modal-close'>
          ✖
        </button>

        <h2>{coin.asset_id}</h2>

        {!purchaseDone ? (
          <>
            <div className='exchanges'>
              <p>Seleccioná un exchange para comprar:</p>
              <div className='exchanges-container'>
                {exchanges.map((exchange) => (
                  <Exchange
                    key={exchange.exchange_id}
                    selectHandler={selectExchangeHandler}
                    selectedExchange={selectedExchange}
                    exchange={exchange}
                  />
                ))}
              </div>
            </div>

            <ul className='buy-modal-detail'>
              <li>
                <b>💵 USD Rate:</b> {coin.exchangeRate.rate.toFixed(2)} U$D
              </li>

              <li>
                <b>
                  💰 Cantidad en USD:{' '}
                  <span className='buy-modal-dollar-sign'>$</span>
                  <input
                    disabled={!selectedExchange}
                    type='number'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='buy-modal-input'
                  />
                </b>
              </li>

              <li>
                <b>📀 Crypto a comprar:</b>
                <span className='buy-modal-total'>
                  {!isNaN(cryptoAmount) ? cryptoAmount.toFixed(6) : '-'}
                </span>
              </li>
            </ul>

            {purchaseError && (
              <div className='purchase-error'>
                <ErrorMessage text={purchaseError} />
              </div>
            )}

            <button
              className='purchase-button'
              onClick={completePurchaseHandler}
            >
              Finalizar compra
            </button>
          </>
        ) : (
          <div className='purchase-complete'>
            <p>
              ✅ ¡Felicidades, ha comprado {cryptoAmount.toFixed(6)}{' '}
              {coin.asset_id}!
            </p>
            <button onClick={handleClose} className='purchase-button'>
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyModal;
