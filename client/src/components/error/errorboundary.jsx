import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true }; // must return true
  }

  componentDidCatch(error, info) {
    // error is err content, info is which components throw the err
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return <div>Something is WRONG!</div>; // show err page
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
