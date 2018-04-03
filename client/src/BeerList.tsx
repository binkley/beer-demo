import * as React from 'react';
import './App.css';
import GiphyImage from './GiphyImage';

interface Beer {
  id: number;
  name: string;
}

interface BeerListState {
  beers: Array<Beer>;
  isLoading: boolean;
}

class BeerList extends React.Component<{}, BeerListState> {
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
      <div>
        <h2>Beers</h2>
        {beers.map((beer: Beer) => {
          return <div key={beer.id}>
            {beer.name}<br/>
            <GiphyImage name={beer.name}/>
          </div>;
        })}
      </div>
    );
  }
}

export default BeerList;
