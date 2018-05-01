import * as React from 'react';
import './App.css';
import BeerList from './BeerList';

const logo = require('./logo.svg');

interface AppState {
  keyString: string;
}

const initState = {
  keyString: 'Nothing.'
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.clearKeyDown = this.clearKeyDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = initState;
  }

  clearKeyDown(event: React.MouseEvent<Element>) {
    this.setState(initState);
  }

  handleKeyDown(event: React.KeyboardEvent<Element>) {
    const keyEvent = {
      key: event.key,
      keyCode: event.keyCode,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey
    };

    this.setState({
      keyString: JSON.stringify(keyEvent, null, 2)
    });
  }

  render() {
    const {keyString} = this.state;

    return (
      <div className="full-screen" tabIndex={0} onClick={this.clearKeyDown} onKeyDown={this.handleKeyDown}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <BeerList/>
        </div>

        <div className="center-outer">
          <pre className="center-inner">{keyString}</pre>
        </div>
      </div>
    );
  }
}

export default App;
