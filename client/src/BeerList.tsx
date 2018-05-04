import * as React from 'react';
import './App.css';
import GiphyImage from './GiphyImage';
import { Table } from 'semantic-ui-react';

interface Beer {
  id: number;
  name: string;
  quality: number;
}

interface BeerListProps {
  loadingMessage: string;
}

interface BeerListState {
  beers: Array<Beer>;
  loadingMessage: string | null;
}

class BeerList extends React.Component<BeerListProps, BeerListState> {
  constructor(props: BeerListProps) {
    super(props);

    this.state = {
      beers: [],
      loadingMessage: null
    };
  }

  componentDidMount() {
    const {loadingMessage} = this.props;

    this.setState({
      loadingMessage: loadingMessage
    });

    fetch('http://localhost:8080/beers/search/good-beers?quality=86')
      .then(response => response.json())
      .then(data => data._embedded.beers)
      .then(beers => this.setState({
        beers: beers,
        loadingMessage: null
      }));
  }

  render() {
    const {beers, loadingMessage} = this.state;

    if (loadingMessage) {
      return <p>{loadingMessage}</p>;
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
