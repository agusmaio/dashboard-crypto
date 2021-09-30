import axios from 'axios';
import apiKey from 'constants/apiKey';

export const api = async (obj) => {
  return await axios({
    ...obj,
    headers: {
      'X-CoinAPI-Key': apiKey,
    },
  });
};
