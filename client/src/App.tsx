import * as React from 'react';
import './App.css';
import BeerList from './BeerList';
import KeyDownCapture from './KeyDownCapture';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <KeyDownCapture>
        <BeerList loadingMessage={'Loading ...'}/>
      </KeyDownCapture>);
  }
}

export default App;
