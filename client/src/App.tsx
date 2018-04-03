import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

interface Beer {
  id: number;
  name: string;
}

interface AppState {
  beers: Array<Beer>;
  isLoading: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      beers: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    fetch('http://localhost:8080/good-beers')
      .then(response => response.json())
      .then(data => this.setState({
        beers: data,
        isLoading: false
      }));
  }

  render() {
    const {beers, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>
          <h2>Beers</h2>
          {beers.map((beer: Beer) => {
            return <div key={beer.id}>
              {beer.name}
            </div>;
          })}
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to
          reload.
        </p>
      </div>
    );
  }
}

export default App;
