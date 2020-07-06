import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

class GetCurrentUser extends React.Component {
  componentDidMount = async () => {
    await this.props.GoogleSignIn();
    this.props.history.push("/");
  };
  render() {
    return <div>redirect ... </div>;
  }
}

export default connect(null, actions)(GetCurrentUser);
