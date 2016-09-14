// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore } from 'redux';
import rootReducer from '../reducers';
import {IApplicationState} from '../reducers/fuel-savings';

interface IWindowModuleHot extends Window {
  module: {
    hot: {
      accept: (path: string, callback: () => void) => void;
    };
  };
}

export default function configureStore(initialState: IApplicationState = undefined) {
  const store = createStore(rootReducer, initialState);
  const hotWindow = window as IWindowModuleHot;

  if (hotWindow.module && hotWindow.module.hot) {
    // Enable Webpack hot module replacement for reducers
    hotWindow.module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
