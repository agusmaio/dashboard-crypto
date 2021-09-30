const base = 'https://rest.coinapi.io';

export const endpoints = {
  assets: `${base}/v1/assets`,
  assetsIcons: `${base}/v1/assets/icons/40`,
  exchangeRate: (coin) => `${base}/v1/exchangerate/${coin}/USD`,
  exchanges: `${base}/v1/exchanges`,
  exchangesIcons: `${base}/v1/exchanges/icons/40`,
};
