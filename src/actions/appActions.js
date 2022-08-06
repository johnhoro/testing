import * as types from './index';

export const appNavigateAction = (route) => {
  return {
    type: types.APP_NAVIGATE,
    route
  }
};
