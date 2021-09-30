import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import { Redirect } from 'react-router';
import { routes } from 'constants/routes';
import Coins from 'components/Coins/Coins';
import BuyModal from 'components/BuyModal/BuyModal';
import ErrorMessage from 'components/Common/ErrorMessage';
import Loading from 'components/Common/Loading';

const Home = ({
  entry,
  fetchCoins,
  fetchExchanges,
  coins,
  coinsRequest,
  exchanges,
  exchangesRequest,
}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    fetchCoins();
    fetchExchanges();
  }, [fetchCoins, fetchExchanges]);

  if (!entry.complete) return <Redirect to={routes.welcome} />;

  let content = null;

  if (coinsRequest.error || exchangesRequest.error) {
    content = (
      <ErrorMessage text='Lo sentimos, se ha producido un error, recargue la página.' />
    );
  } else if (coinsRequest.loading || exchangesRequest.loading) {
    content = <Loading />;
  } else {
    content = (
      <>
        <Coins coins={coins} setSelectedCoin={setSelectedCoin} />

        {selectedCoin && (
          <BuyModal
            exchanges={exchanges}
            handleClose={() => setSelectedCoin(null)}
            coin={selectedCoin}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Header />

      <main>{content}</main>
    </>
  );
};

export default Home;
