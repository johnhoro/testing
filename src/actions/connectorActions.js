import * as types from './index';

export const getConnectorsAction = () => {
  return {
    type: types.GET_CONNECTORS
  }
};

export const addConnectorAction = (connector) => {
  return {
    type: types.ADD_CONNECTOR,
    connector
  }
};
