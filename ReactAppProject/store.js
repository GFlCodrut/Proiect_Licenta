import { createStore } from 'redux';

// Define the initial state and reducer function
const initialState = {
  currentUser: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
