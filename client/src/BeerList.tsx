import * as React from 'react';
import './App.css';
import GiphyImage from './GiphyImage';
import { Table } from 'semantic-ui-react';

interface Beer {
  id: number;
  name: string;
  quality: number;
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

    fetch('http://localhost:8080/beers/search/good-beers?quality=86')
      .then(response => response.json())
      .then(data => data._embedded.beers)
      .then(beers => this.setState({
        beers: beers,
        isLoading: false
      }));
  }

  render() {
    const {beers, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Beers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {beers.map((beer: Beer, index: number) => {
            return <Table.Row key={index}>
              <Table.Cell>
                {beer.name}<br/>
                <GiphyImage name={beer.name}/>
              </Table.Cell>
            </Table.Row>;
          })}
        </Table.Body>
      </Table>);
  }
}

export default BeerList;
