import Home from './Home';
import { connect } from 'react-redux';
import { fetchCoins, fetchExchanges } from 'store/actionCreators';

const mapStateToProps = (state) => ({
  entry: state.entry,
  coins: state.coins,
  coinsRequest: state.coinsRequest,
  exchanges: state.exchanges,
  exchangesRequest: state.exchangesRequest,
});

const mapDispatchToProps = {
  fetchCoins,
  fetchExchanges,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
