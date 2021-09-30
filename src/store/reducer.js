import { apiCallStates } from 'constants/apiCallStates';
import * as actionTypes from './actionTypes';

/* estado inicial de la app */
const initialState = {
  entry: {
    name: '',
    lastName: '',
    complete: false,
  },
  coins: [],
  coinsRequest: { ...apiCallStates },
  exchanges: [],
  exchangesRequest: { ...apiCallStates },
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_EXCHANGES_LOADING: {
      return {
        ...state,
        exchangesRequest: {
          loading: true,
          error: false,
          success: false,
        },
      };
    }
    case actionTypes.FETCH_EXCHANGES_SUCCESS: {
      return {
        ...state,
        exchangesRequest: {
          ...state.exchangesRequest,
          loading: false,
          success: true,
        },
        exchanges: payload,
      };
    }
    case actionTypes.FETCH_EXCHANGES_ERROR: {
      return {
        ...state,
        exchangesRequest: {
          ...state.exchangesRequest,
          loading: false,
          error: true,
        },
      };
    }
    case actionTypes.FETCH_COINS_LOADING: {
      return {
        ...state,
        coinsRequest: {
          loading: true,
          error: false,
          success: false,
        },
      };
    }
    case actionTypes.FETCH_COINS_SUCCESS: {
      return {
        ...state,
        coinsRequest: {
          ...state.coinsRequest,
          loading: false,
          success: true,
        },
        coins: payload,
      };
    }
    case actionTypes.FETCH_COINS_ERROR: {
      return {
        ...state,
        coinsRequest: {
          ...state.coinsRequest,
          loading: false,
          error: true,
        },
      };
    }
    case actionTypes.SET_ENTRY: {
      return {
        ...state,
        entry: {
          name: payload.name,
          lastName: payload.lastName,
          complete: payload.complete,
        },
      };
    }
    default: {
      return state;
    }
  }
};
