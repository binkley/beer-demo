import * as React from 'react';
import './App.css';
import GiphyImage from './GiphyImage';
import { Confirm, Ref, Table } from 'semantic-ui-react';

interface Beer {
  id: number;
  name: string;
  quality: number;
  selected: boolean;
}

interface BeerListProps {
  loadingMessage: string;
}

interface BeerListState {
  beers: Array<Beer>;
  loadingMessage: string | null;
  confirm: boolean;
}

export function BeerCell({beer}: { beer: Beer }) {
  return (
    <Table.Cell>
      <h4>{beer.name}</h4>,
      <GiphyImage name={beer.name}/>
    </Table.Cell>);
}

class BeerList extends React.Component<BeerListProps, BeerListState> {
  constructor(props: BeerListProps) {
    super(props);

    this.handleSelected = this.handleSelected.bind(this);
    this.handleToConfirm = this.handleToConfirm.bind(this);
    this.handleCancelled = this.handleCancelled.bind(this);
    this.handleConfirmed = this.handleConfirmed.bind(this);

    this.state = {
      beers: [],
      loadingMessage: null,
      confirm: false
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

  handleSelected(index: number) {
    const {beers} = this.state;

    beers[index].selected = !beers[index].selected;

    this.setState({beers: beers});
  }

  handleToConfirm() {
    this.setState({confirm: true});
  }

  handleCancelled() {
    this.setState({confirm: false});
  }

  handleConfirmed() {
    const {beers} = this.state;

    beers.forEach(beer => beer.selected = false);

    this.setState({beers: beers, confirm: false});
  }

  handleKeyDown(index: number, event: React.KeyboardEvent<HTMLElement>) {
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
      case ' ':
        this.handleSelected(index);
        break;
      case 'Enter':
        this.handleToConfirm();
        break;
      default:
    }
  }

  render() {
    const {beers, loadingMessage, confirm} = this.state;

    if (loadingMessage) {
      return <p>{loadingMessage}</p>;
    }

    const handleFocusFirstRow = (index: number, node: HTMLElement) => 0 === index && node.focus();

    return [
      (
        <Table striped={true} selectable={true} key={0}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Beers</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {beers.map((beer: Beer, index: number) => {
              return (
                <Ref
                  key={index}
                  innerRef={(node) => handleFocusFirstRow(index, node)}
                >
                  <Table.Row
                    tabIndex={0}
                    active={beer.selected}
                    onClick={() => this.handleSelected(index)}
                    onKeyDown={this.handleKeyDown.bind(this, index)}
                  >
                    <BeerCell beer={beer}/>
                  </Table.Row>
                </Ref>);
            })}
          </Table.Body>
        </Table>),
      (
        <Confirm
          open={confirm}
          key={1}
          cancelButton="No"
          confirmButton="Yes"
          content="Drink beers?"
          onCancel={this.handleCancelled}
          onConfirm={this.handleConfirmed}
        />)];
  }
}

export default BeerList;
