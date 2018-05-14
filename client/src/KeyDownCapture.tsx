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

interface DispatchFromProps {
  capture(keyState: ReactNode): ActionType<ReactNode>;

  clear(): ActionType<{}>;
}

interface StateFromProps {
  keyState: ReactNode;
}

interface KeyDownCaptureProps extends DispatchFromProps {
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

function captureAction(keyState: ReactNode): ActionType<ReactNode> {
  return {
    type: 'capture',
    payload: keyState
  };
}

function clearAction(): ActionType<{}> {
  return {
    type: 'clear'
  };
}

class KeyDownCapture extends React.Component<KeyDownCaptureProps, KeyDownCaptureState> {
  constructor(props: KeyDownCaptureProps) {
    super(props);

    this.clearKeyDown = this.clearKeyDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    const {clear} = this.props;

    clear();
  }

  clearKeyDown() {
    const {clear} = this.props;

    clear();
  }

  handleKeyDown(event: React.KeyboardEvent<Element>) {
    const {capture} = this.props;

    const keyEvent = {
      key: event.key,
      keyCode: event.keyCode,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey
    };

    capture(JSON.stringify(keyEvent, null, 2));

    switch (event.key) {
      case 'F5':
        this.forceUpdate();
        break;
      default:
    }
  }

  render() {
    const {children, keyState} = this.props;

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

const mapStateToProps = (state: RootStateType): StateFromProps => {
  return {
    keyState: state.keyState
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => {
  return {
    capture: (keyState: ReactNode) => dispatch(captureAction(keyState)),
    clear: () => dispatch(clearAction())
  };
};

export default connect<StateFromProps, DispatchFromProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(KeyDownCapture);
