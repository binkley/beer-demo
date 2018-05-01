import * as React from 'react';
import './App.css';
import BeerList from './BeerList';

const logo = require('./logo.svg');

interface AppState {
  keyString: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      keyString: 'Nothing.'
    };
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
      <div className="full-screen" tabIndex={0} onKeyDown={this.handleKeyDown}>
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
