import * as React from 'react';
import { ReactNode } from 'react';

interface KeyDownCaptureState {
  keyState: ReactNode;
}

const initState = {
  keyState: 'Nothing.'
};

class KeyDownCapture extends React.Component<{}, KeyDownCaptureState> {
  constructor(props: {}) {
    super(props);

    this.clearKeyDown = this.clearKeyDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = initState;
  }

  clearKeyDown() {
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
      keyState: JSON.stringify(keyEvent, null, 2)
    });

    switch (event.key) {
      case 'F5':
        this.forceUpdate();
        break;
      default:
    }
  }

  render() {
    const {children} = this.props;
    const {keyState} = this.state;

    return (
      <div
        className="full-screen-event-capture"
        tabIndex={0}
        onClick={this.clearKeyDown}
        onKeyDown={this.handleKeyDown}
      >
        {children}

        <div className="center-outer">
          <pre className="center-inner">{keyState}</pre>
        </div>
      </div>);
  }
}

export default KeyDownCapture;
