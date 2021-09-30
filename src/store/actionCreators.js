import { endpoints } from "constants/endpoints";
import { routes } from "constants/routes";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { api } from "./api";

export const navigateToDashboard =
  (name, lastName, history) => async (dispatch) => {
    dispatch({
      type: actionTypes.SET_ENTRY,
      payload: {
        name,
        lastName,
        complete: true,
      },
    });
    history.push(routes.home);
  };

export const fetchCoins = () => async (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_COINS_LOADING,
  });

  try {
    // TEMPORARILY TO AVOID REACHING API LIMIT
    const storageCoins = localStorage.getItem("coins");

    if (storageCoins) {
      dispatch({
        type: actionTypes.FETCH_COINS_SUCCESS,
        payload: JSON.parse(storageCoins),
      });

      return;
    }

    const response = await api({
      method: "get",
      url: endpoints.assets,
    });

    const responseIcons = await api({
      method: "get",
      url: endpoints.assetsIcons,
    });

    const filteredCoins = response.data
      .filter((coin) => {
        //filter out coins younger than 5 years so we don't have random coins with random numbers
        const criptoStart = new Date(coin.data_start)?.getFullYear();
        const isValid = new Date().getFullYear() - criptoStart > 5;

        return coin.type_is_crypto && isValid;
      })
      .sort((a, b) => b.volume_1mth_usd - a.volume_1mth_usd)
      .slice(0, 5)
      .map((coin) => ({
        ...coin,
        icon: responseIcons.data.find((icon) => icon.asset_id === coin.asset_id)
          ?.url,
      }));

    for (let i = 0; i < filteredCoins.length; i++) {
      const assetId = filteredCoins[i].asset_id;

      const exchangeResponse = await api({
        method: "get",
        url: endpoints.exchangeRate(assetId),
      });

      filteredCoins[i].exchangeRate = exchangeResponse.data;
    }

    dispatch({
      type: actionTypes.FETCH_COINS_SUCCESS,
      payload: filteredCoins,
    });

    localStorage.setItem("coins", JSON.stringify(filteredCoins));
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_COINS_ERROR,
    });
  }
};

export const fetchExchanges = () => async (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_EXCHANGES_LOADING,
  });

  try {
    const storageExchanges = localStorage.getItem("exchanges");

    if (storageExchanges) {
      dispatch({
        type: actionTypes.FETCH_EXCHANGES_SUCCESS,
        payload: JSON.parse(storageExchanges),
      });

      return;
    }

    const response = await api({
      method: "get",
      url: endpoints.exchanges,
    });

    const responseIcons = await api({
      method: "get",
      url: endpoints.exchangesIcons,
    });

    const filteredExchanges = response.data
      .sort((a, b) => b.volume_1mth_usd - a.volume_1mth_usd)
      .slice(0, 3)
      .map((exchange, index) => ({
        ...exchange,
        icon: responseIcons.data.find(
          (icon) => icon.exchange_id === exchange.exchange_id
        )?.url,
        index,
      }));

    dispatch({
      type: actionTypes.FETCH_EXCHANGES_SUCCESS,
      payload: filteredExchanges,
    });

    localStorage.setItem("exchanges", JSON.stringify(filteredExchanges));
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_COINS_ERROR,
    });
  }
};
