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

    this.handleKeyDown = this.handleKeyDown.bind(this);

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

  handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    const {
      key,
      currentTarget: {
        previousElementSibling,
        nextElementSibling
      }
    } = event;

    switch (key) {
      case 'ArrowDown':
        if (nextElementSibling) {
          (nextElementSibling as HTMLElement).focus();
        }
        break;
      case 'ArrowUp':
        if (previousElementSibling) {
          (previousElementSibling as HTMLElement).focus();
        }
        break;
      default:
    }
  }

  render() {
    const {beers, loadingMessage} = this.state;

    if (loadingMessage) {
      return <p>{loadingMessage}</p>;
    }

    return (
      <Table striped={true} selectable={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Beers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {beers.map((beer: Beer, index: number) => {
            return <Table.Row key={index} tabIndex={0} onKeyDown={this.handleKeyDown}>
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
