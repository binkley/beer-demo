import * as React from 'react';
import { ReactNode } from 'react';
import { connect, Dispatch } from 'react-redux';

interface Action<P> {
  type: string;
  payload?: P;
}

type ActionType<P> = Action<P>;

interface KeyDownCaptureState {
  keyState: ReactNode;
}

const initState = {
  keyState: 'Nothing.'
};

interface KeyDownCaptureProps {
  keyState: ReactNode;
}

export const keyDownCaptureReducer = (state = initState, action: ActionType<{}>): KeyDownCaptureState => {
  switch (action.type) {
    case 'capture':
      return {
        keyState: action.payload
      };
    case 'clear':
      return initState;
    default:
      return state;
  }
};

interface DispatchProps {
  capture(keyState: ReactNode): ActionType<ReactNode>;

  clear(): ActionType<{}>;
}

function capture(keyState: ReactNode): ActionType<ReactNode> {
  return {
    type: 'capture',
    payload: keyState
  };
}

function clear(): ActionType<{}> {
  return {
    type: 'clear'
  };
}

class KeyDownCapture extends React.Component<KeyDownCaptureProps, KeyDownCaptureState> {
  constructor(props: KeyDownCaptureProps) {
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

type RootStateType = KeyDownCaptureState;

const mapStateToProps = (state: RootStateType): KeyDownCaptureProps => {
  return {
    keyState: state.keyState
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    capture: (keyState: ReactNode) => dispatch(capture(keyState)),
    clear: () => dispatch(clear())
  };
};

export default connect<KeyDownCaptureProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(KeyDownCapture);
