import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import BeerList from './BeerList';
import KeyDownCapture, { keyDownCaptureReducer } from './KeyDownCapture';

const store = createStore(keyDownCaptureReducer);

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <KeyDownCapture>
          <BeerList loadingMessage={'Loading ...'}/>
        </KeyDownCapture>
      </Provider>);
  }
}
