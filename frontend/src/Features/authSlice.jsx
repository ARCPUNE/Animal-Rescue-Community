// authSlice.js
const initialState = {
    jwtToken: null,
    refreshToken: null,
  };
  
  // Action Types
  const SET_TOKENS = 'SET_TOKENS';
  const CLEAR_TOKENS = 'CLEAR_TOKENS';
  
  // Reducer
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TOKENS:
        return {
          ...state,
          jwtToken: action.payload.jwtToken,
          refreshToken: action.payload.refreshToken,
        };
      case CLEAR_TOKENS:
        return {
          ...state,
          jwtToken: null,
          refreshToken: null,
        };
      default:
        return state;
    }
  };
  
  // Action Creators
  export const setTokens = (jwtToken, refreshToken) => ({
    type: SET_TOKENS,
    payload: { jwtToken, refreshToken },
  });
  
  export const clearTokens = () => ({
    type: CLEAR_TOKENS,
  });
  
  export default authReducer;
  